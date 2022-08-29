###############################################################################
# Creation of a file storage system for the EduHub application
#####

# Create a bucket in Google cloud storage service (GCS).
resource "google_storage_bucket" "main" {
  name     = var.project_id
  location = var.region
  depends_on = [
    google_project.eduhub
  ]
}

# Give the github service account admin permission on the Google Storage bucket
resource "google_storage_bucket_iam_member" "admin" {
  bucket = google_storage_bucket.main.name
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${google_service_account.github.email}"
}
