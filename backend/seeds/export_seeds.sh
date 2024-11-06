#!/bin/bash

# Configuration
CONTAINER_NAME="eduhub-hasura"
SCHEMA_NAME="public"
SEEDS_DIR="./default"
PG_PASSWORD="postgrespassword"  # From your docker-compose.yml

# Create seeds directory if it doesn't exist
mkdir -p "$SEEDS_DIR"

# Get list of tables excluding enum tables
tables=$(docker exec -e PGPASSWORD=$PG_PASSWORD $CONTAINER_NAME psql -U postgres -h db_hasura -d postgres -t -c "\
    SELECT table_name \
    FROM information_schema.tables \
    WHERE table_schema = '$SCHEMA_NAME' \
    AND table_type = 'BASE TABLE' \
    AND table_name NOT IN ( \
        'AchievementRecordType', \
        'AchievementRecordRating', \
        'AttendanceStatus', \
        'AttendanceSource', \
        'CourseEnrollmentStatus', \
        'MotivationRating', \
        'LocationOption', \
        'MailStatus', \
        'CertificateType', \
        'CourseStatus', \
        'Employment', \
        'OrganizationType', \
        'University', \
        'UserOccupation', \
        'UserStatus', \
        'Weekday', \
        'Language', \
        'AppSettings', \
        'CourseGroupOption' \
    );" | grep -v '^\s*$')

echo "Found tables (excluding enum tables):"
echo "$tables"

# Create seed name
SEED_NAME="initial_seeds"

# Build the command with multiple --from-table flags
cmd="hasura-cli seed create $SEED_NAME --database-name default"
for table in $tables; do
    table=$(echo $table | tr -d '[:space:]')
    cmd="$cmd --from-table $table"
done

echo "Executing command: $cmd"

# Execute the command
docker exec -w /hasura $CONTAINER_NAME $cmd

if [ $? -eq 0 ]; then
    # Find and rename the most recent seed file
    latest_seed=$(docker exec -w /hasura $CONTAINER_NAME \
        find seeds/default -name "*${SEED_NAME}.sql" -type f -printf '%T@ %p\n' | \
        sort -n | tail -1 | cut -f2- -d" ")
    
    if [ ! -z "$latest_seed" ]; then
        # Rename the file inside the container
        docker exec -w /hasura $CONTAINER_NAME mv "$latest_seed" "seeds/default/$SEED_NAME.sql"
        echo "Successfully created and renamed database snapshot to: $SEED_NAME.sql"
        echo "Note: This is a snapshot of the current database state."
    else
        echo "Warning: Could not find the created seed file"
    fi
else
    echo "Failed to export tables"
fi

echo "Export completed! File is in $SEEDS_DIR"