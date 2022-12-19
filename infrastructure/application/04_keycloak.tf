###############################################################################
# Create Google Cloud Run service for Keycloak
#####

# Create a secret for the password of the Keycloak console in the Google secret manager 
resource "google_secret_manager_secret" "keycloak_pw" {
  provider  = google-beta
  secret_id = "keycloak-pw"
  replication {
    automatic = true
  }
}
# Set the password for the Keycloak console
resource "google_secret_manager_secret_version" "keycloak_pw" {
  provider    = google-beta
  secret      = google_secret_manager_secret.keycloak_pw.name
  secret_data = var.keycloak_pw
}
# Grant the defined service account member the IAM permissions to access the secrect with the password for the Keycloak console
resource "google_secret_manager_secret_iam_member" "keycloak_pw" {
  secret_id  = google_secret_manager_secret.keycloak_pw.id
  role       = "roles/secretmanager.secretAccessor"
  member     = "serviceAccount:${data.google_project.eduhub.number}-compute@developer.gserviceaccount.com"
  depends_on = [google_secret_manager_secret.keycloak_pw]
}

# Apply IAM policy (see 'main.tf') which grants any user the privilige to invoke the Cloud Run service for keycloak
resource "google_cloud_run_service_iam_policy" "keycloak_noauth_invoker" {
  location    = module.keycloak_service.location
  project     = module.keycloak_service.project_id
  service     = module.keycloak_service.service_name
  policy_data = data.google_iam_policy.noauth_invoker.policy_data
}


## TODO to increase the security:

/* # Creation of a Google Cloud service account to manage Cloud Run
resource "google_service_account" "cloud-run-service-account" {
  account_id   = "cloud-run"
  display_name = "Cloud Run Service Account"
}
# Updates the IAM policy for the cloud run service by allowing access to the given member with the provided role
resource "google_cloud_run_service_iam_binding" "cloud-run-iam" {
  location = module.keycloak_service.location
  project  = module.keycloak_service.project_id
  service  = module.keycloak_service.service_name
  role     = "roles/iam.serviceAccountUser"
  members  = ["serviceAccount:${google_service_account.cloud-run-service-account.email}"]
}
# Updates the IAM policy for the cloud run service by allowing access to the given member with the provided role
resource "google_cloud_run_service_iam_binding" "cloud-run-iam" {
  location = module.keycloak_service.location
  project  = module.keycloak_service.project_id
  service  = module.keycloak_service.service_name
  role     = "roles/admin"
  members  = ["serviceAccount:${google_service_account.cloud-run-service-account.email}"]
}
 */

# Define the Google Cloud Run service for Keycloak
module "keycloak_service" {
  source  = "GoogleCloudPlatform/cloud-run/google"
  version = "~> 0.2.0"

  # Required variables
  service_name = local.keycloak_service_name
  project_id   = var.project_id
  location     = var.region
  image        = "${var.region}-docker.pkg.dev/${var.project_id}/docker-repo/keycloak:${var.commit_sha}"

  limits = {
    cpu    = "1000m"
    memory = "2Gi"
  }

  container_concurrency = "80"

  service_annotations = {
    "run.googleapis.com/client-name" = "terraform"
    #"run.googleapis.com/launch-stage"   = "BETA"
    "run.googleapis.com/ingress"        = "internal-and-cloud-load-balancing"
    "run.googleapis.com/ingress-status" = "internal-and-cloud-load-balancing"
  }
  template_annotations = {
    "run.googleapis.com/client-name"           = "cloud-console"
    "autoscaling.knative.dev/minScale"         = "0"
    "run.googleapis.com/vpc-access-egress"     = "private-ranges-only"
    "run.googleapis.com/cloudsql-instances"    = google_sql_database_instance.default.connection_name
    "run.googleapis.com/execution-environment" = "gen2"
    "autoscaling.knative.dev/maxScale"         = "1"
    "run.googleapis.com/vpc-access-connector"  = google_vpc_access_connector.default.id
  }
  env_vars = [
    {
      name  = "KC_DB_URL"
      value = "jdbc:postgresql://${google_sql_database_instance.default.private_ip_address}/keycloak"
    },
    {
      name  = "KEYCLOAK_ADMIN"
      value = var.keycloak_user
    },
    {
      name  = "KC_DB_USERNAME"
      value = var.keycloak_db_user
    },
    {
      name  = "KC_DB"
      value = "postgres"
    },
    {
      name  = "KC_HOSTNAME"
      value = "${local.keycloak_service_name}.opencampus.sh"
    },
    {
      name  = "KC_PROXY"
      value = "edge"
    },
    {
      name  = "KC_HTTP_ENABLED"
      value = "true"
    }
  ]
  env_secret_vars = [
    {
      name = "KEYCLOAK_ADMIN_PASSWORD"
      value_from = [
        {
          secret_key_ref = {
            key  = "latest"
            name = google_secret_manager_secret.keycloak_pw.secret_id
          }
        }
      ]
    },
    {
      name = "KC_DB_PASSWORD"
      value_from = [
        {
          secret_key_ref = {
            key  = "latest"
            name = google_secret_manager_secret.keycloak_db_pw.secret_id
          }
        }
      ]
    }
  ]
}
