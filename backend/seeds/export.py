#!/usr/bin/env python3
import subprocess
import os
import yaml
import json
from datetime import datetime
import sys
from collections import OrderedDict

class HasuraYamlSeeder:
    def __init__(self):
        self.config = {
            'postgres_container': 'eduhub-db_hasura',
            'postgres_user': 'postgres',
            'postgres_password': 'postgrespassword',
            'postgres_db': 'postgres',
            'seeds_dir': os.path.join(os.path.dirname(__file__), 'default'),
            'excluded_schemas': ['information_schema', 'pg_catalog', 'hdb_catalog', 'hdb_views']
        }

    def execute_psql_command(self, command):
        """Execute a PSQL command inside the Docker container"""
        cmd = [
            "docker", "exec",
            self.config['postgres_container'],
            "psql",
            "-U", self.config['postgres_user'],
            "-d", self.config['postgres_db'],
            "-t",  # tuple only output
            "-A",  # unaligned output
            "-c", command
        ]
        
        env = os.environ.copy()
        env["PGPASSWORD"] = self.config['postgres_password']
        
        result = subprocess.run(cmd, env=env, capture_output=True, text=True)
        return result

    def get_all_tables(self, specific_tables=None):
        """Get all tables from the database excluding system schemas"""
        query = """
        SELECT DISTINCT
            quote_ident(table_schema) || '.' || quote_ident(table_name) as table_path,
            table_schema,
            table_name
        FROM 
            information_schema.tables 
        WHERE 
            table_schema NOT IN ('information_schema', 'pg_catalog', 'hdb_catalog', 'hdb_views')
            AND table_type = 'BASE TABLE'
        """
        
        if specific_tables:
            table_list = "', '".join(specific_tables)
            query += f"\n            AND table_name IN ('{table_list}')"
            
        query += "\nORDER BY table_schema, table_name;"

        result = self.execute_psql_command(query)
        if result.returncode == 0:
            tables = [line.strip().split('|') for line in result.stdout.split('\n') if line.strip()]
            return tables
        print(f"Error getting tables: {result.stderr}")
        return []

    def ensure_seeds_directory(self):
        """Ensure seeds directory exists"""
        os.makedirs(self.config['seeds_dir'], exist_ok=True)

    def export_table_to_yaml(self, table_info) -> dict:
        """Export a single table to YAML format"""
        table_path, schema, table = table_info
        
        # First, verify if table has data
        count_query = f'SELECT COUNT(*) FROM {schema}."{table}";'
        count_result = self.execute_psql_command(count_query)
        
        if count_result.returncode != 0:
            print(f"Error checking count for table {table_path}: {count_result.stderr}")
            return None
            
        count = int(count_result.stdout.strip() or 0)
        if count == 0:
            print(f"⚠️  No data in table {table_path}")
            return None

        # Export data
        query = f"""
        SELECT row_to_json(t)
        FROM (SELECT * FROM {schema}."{table}") t;
        """
        
        result = self.execute_psql_command(query)
        
        if result.returncode == 0 and result.stdout:
            # Parse each line as a JSON object
            rows = [json.loads(line) for line in result.stdout.split('\n') if line.strip()]
            
            # Create an ordered dictionary to maintain field order
            seed_data = OrderedDict([
                ("table", OrderedDict([
                    ("name", table),
                    ("schema", schema)
                ])),
                ("source", "default"),
                ("data", rows)
            ])
            
            return seed_data
            
        print(f"Error exporting data for table {table_path}: {result.stderr if result.returncode != 0 else 'No data returned'}")
        return None

    def export_seeds(self, specific_tables=None):
        """Export all tables or specific tables to YAML seeds"""
        self.ensure_seeds_directory()
        
        # Get tables (all or specific ones)
        tables = self.get_all_tables(specific_tables)

        if not tables:
            print("No tables found to export!")
            return

        print(f"Found {len(tables)} tables to export")
        print("Tables found:", [t[0] for t in tables])
        
        seeds_config = []

        # Load existing seeds.yaml if it exists
        seeds_yaml_path = f"{self.config['seeds_dir']}/seeds.yaml"
        if os.path.exists(seeds_yaml_path):
            with open(seeds_yaml_path, 'r') as f:
                seeds_config = yaml.safe_load(f) or []

        # Define the custom YAML dumper
        class OrderedDumper(yaml.Dumper):
            pass
        
        def _dict_representer(dumper, data):
            return dumper.represent_mapping('tag:yaml.org,2002:map', data.items())
        
        OrderedDumper.add_representer(OrderedDict, _dict_representer)
        
        for table_info in tables:
            if len(table_info) != 3:
                continue
                
            table_path, schema, table = table_info
            output_file = f"{table}.yaml"
            
            print(f"\nProcessing {table_path}...")
            seed_data = self.export_table_to_yaml(table_info)
            
            if seed_data and seed_data['data']:
                try:
                    with open(f"{self.config['seeds_dir']}/{output_file}", 'w') as f:
                        yaml.dump(
                            seed_data, 
                            f, 
                            Dumper=OrderedDumper,
                            default_flow_style=False, 
                            allow_unicode=True
                        )
                    # Append to seeds_config if not already present
                    if not any(d['table'] == table for d in seeds_config):
                        seeds_config.append({
                            'table': table,
                            'file': output_file
                        })
                    print(f"✓ Successfully exported {table_path} with {len(seed_data['data'])} records")
                except Exception as e:
                    print(f"✗ Failed to write YAML file for {table_path}: {str(e)}")
            else:
                print(f"ℹ️ Skipping {table_path} (no data)")
        
        # Write seeds.yaml configuration file
        if seeds_config:
            with open(seeds_yaml_path, 'w') as f:
                yaml.dump(seeds_config, f, default_flow_style=False)
            print("\n✓ Successfully updated seeds.yaml configuration")
        else:
            print("No seed data was exported.")

def main():
    seeder = HasuraYamlSeeder()
    # Get table names from command line arguments
    specific_tables = sys.argv[1:] if len(sys.argv) > 1 else None
    seeder.export_seeds(specific_tables)

if __name__ == "__main__":
    main()
