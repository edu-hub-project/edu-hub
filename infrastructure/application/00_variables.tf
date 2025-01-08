###############################################################################
# Definition of the used Terraform variables
######
# Local Variables
###
locals {
  keycloak_service_name         = "${var.keycloak_service_name_root}${var.service_name_extension}"
  hasura_service_name           = "${var.hasura_service_name_root}${var.service_name_extension}"
  eduhub_service_name           = "${var.eduhub_service_name_root}${var.service_name_extension}"
  rent_a_scientist_service_name = "${var.rent_a_scientist_service_name_root}${var.service_name_extension}"
}

######
# Cloud Variables
###
/* variable "GOOGLE_CREDENTIALS" {
  description = "JSON key of the service account 'terraform created' created for the given project"
}
 */
# main
variable "project_id" {
  description = "The id of the Google Cloud project that is created"
  type        = string
}
variable "region" {
  description = "The region for resources associated with the Google Cloud project"
  type        = string
}
variable "zone" {
  description = "The zone for resources associated with the Google Cloud project"
  type        = string
}
variable "cloudflare_email" {
  description = "Email for the user to access Cloudflare"
  type        = string
}
variable "cloudflare_api_key" {
  description = "API key for the user to access Cloudflare"
  type        = string
}
variable "commit_sha" {
  description = "SHA of the current git commit (used as tag for all docker images)"
  type        = string
  default     = ""
}


# network
variable "url_mask" {
  description = "Url mask specifying the group of backend endpoints that will be used for the load balancer"
  type        = string
}
variable "keycloak_service_name_root" {
  description = "Name for the service of the Keycloak application"
  type        = string
}
variable "hasura_service_name_root" {
  description = "Name for the service of the Hasura application"
  type        = string
}
variable "eduhub_service_name_root" {
  description = "Name for the service of the edu frontend application"
  type        = string
}
variable "rent_a_scientist_service_name_root" {
  description = "Name for the service of the Rent-a-Scientist frontend application"
  type        = string
}
variable "service_name_extension" {
  description = "Name extension for the services not run in production but in other environments"
  type        = string
  default     = ""
}
variable "cloudflare_zone_id" {
  description = "The DNS zone ID a record in Cloudflaire will be added to"
  type        = string
}
variable "cloud_function_ingress_settings" {
  description = "Controls what traffic can reach the cloud functions"
  type        = string
  default     = "ALLOW_INTERNAL_ONLY"
}


# databases
variable "dbi_tier" {
  description = "Tier for the database instance"
  type        = string
  default     = "db-f1-micro"
}
variable "dbi_availability" {
  description = "Availablity of the database instance"
  type        = string
  default     = "ZONAL"
}
variable "dbi_create_replica" {
  description = "Create a replica database"
  type        = bool
  default     = "false"
}
variable "dbi_max_connections" {
  # Needs to be higher then the standard setting to allow the startup of hasura
  description = "Define allowed maximum number of connections"
  type        = number
  default     = 250
}
variable "keycloak_db_user" {
  description = "Name for the user of the Keycloak database"
  type        = string
  default     = "admin"
}
variable "keycloak_db_pw" {
  description = "Password for the user of the Keycloak database"
  type        = string
}
variable "hasura_db_user" {
  description = "Name for the user of the Hasura database"
  type        = string
  default     = "admin"
}
variable "hasura_db_pw" {
  description = "Password for the user of the Hasura database"
  type        = string
}

variable "enable_db_backup" {
  description = "Enable or disable database backup"
  type        = bool
  default     = true
}

# keycloak
variable "keycloak_sha" {
  description = "SHA of the current keycloak folder"
  type        = string
  default     = ""
}
variable "keycloak_user" {
  description = "User for the Keycloak console"
  type        = string
}
variable "keycloak_pw" {
  description = "Password for the Keycloak console"
  type        = string
}


# hasura
variable "hasura_sha" {
  description = "SHA of the current hasura folder"
  type        = string
  default     = ""
}
variable "hasura_graphql_admin_key" {
  description = "Admin key for the Hasura GraphQL API"
  type        = string
}
variable "hasura_cloud_function_secret" {
  description = "Hasura secret for cloud functions"
  type        = string
}
variable "hasura_mail_pw" {
  description = "Hasura secret for cloud functions"
  type        = string
}
variable "hasura_mail_user" {
  description = "Hasura secret for cloud functions"
  type        = string
}
variable "hasura_graphql_enable_console" {
  description = "Boolean to enable the Hasura console"
  type        = string
  default     = "false"
}
variable "hasura_graphql_dev_mode" {
  description = "Boolean to enable the GraphQL developer mode for Hasura"
  type        = string
  default     = "false"
}
variable "hasura_memory_limit" {
  description = "Memory limit for Hasura cloud run service"
  type        = string
  default     = "1024M"
}

# Frontend
variable "frontend_sha" {
  description = "SHA of the current frontend-nx folder"
  type        = string
  default     = ""
}
variable "nextauth_secret" {
  description = "Used to encrypt the NextAuth.js JWT, and to hash email verification tokens. This is the default value for the secret option in NextAuth and Middleware."
  type        = string
}
variable "keycloak_hasura_client_secret" {
  description = "Used to authenticate login requests from the edu client."
  type        = string
}
variable "keycloak_ras_client_secret" {
  description = "Used to authenticate login requests from the rent-a-scientist client."
  type        = string
}
variable "help_docs_url" {
  description = "Stores the URL to a GitBook or other documentation resources that serve as the FAQ and user help guide for the application. The URL is utilized within the app to include the resourec via an iframe"
  type        = string
}



# Serverless Functions
variable "functions_sha" {
  description = "SHA of the current functions folder"
  type        = string
  default     = ""
}
variable "environment" {
  description = "Should typically be a value of either `production` or `staging` to possibly change the behaviour of as serverless function depending on the environment."
  type        = string
}

variable "mailgun_api_key" {
  description = "API key for the Mailgun API"
  type        = string
}
variable "mailgun_domain" {
  description = "Domain for the Mailgun API"
  type        = string
}

# API Access
variable "zoom_account_id" {
  description = "Account ID of the registered access the Zoom API"
  type        = string
}
variable "zoom_api_key" {
  description = "Client ID of the registered access the Zoom API"
  type        = string
}
variable "zoom_api_secret" {
  description = "Secret to the the Zoom API access with the given key identifier"
  type        = string
}
variable "lms_url" {
  description = "URL to the LimeSurvey instance"
  type        = string
}
variable "lms_user" {
  description = "User that is used to access the API"
  type        = string
}
variable "lms_password" {
  description = "Password for the API user"
  type        = string
}
variable "lms_attendance_survey_id" {
  description = "ID of the survey which is used to collect the attendance data"
  type        = string
}
variable "mm_url" {
  description = "URL of the Opencampus Mattermost Server"
  type        = string
}
variable "mm_token" {
  description = "The Admin Token from the Opencampus Mattermost Server"
  type        = string
}
