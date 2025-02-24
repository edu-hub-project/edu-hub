###############################################################################
# Definition of network resources
#####

# Create a virtual private cloud (VPC) network on the Google Cloud Platform (GCP).
resource "google_compute_network" "private" {
  provider = google-beta
  name     = "private-network"
}

# Create a Global Address resource. Global addresses are used for HTTP(S) load balancing.
resource "google_compute_global_address" "private" {
  provider      = google-beta
  name          = "private-ip-address"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.private.id
}

# Create a private VPC connection with a GCP service provider
resource "google_service_networking_connection" "private" {
  provider                = google-beta
  network                 = google_compute_network.private.id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private.name]
}

# Create a serverless VPC Access connector
resource "google_vpc_access_connector" "default" {
  provider      = google-beta
  name          = "vpc-lan-con"
  ip_cidr_range = "10.8.0.0/28"
  network       = google_compute_network.private.name
  min_instances = 2
  max_instances = 3
  machine_type  = "f1-micro"
}


###############################################################################
# Creation of the Load Balancer
#####

# Create a network endpoint group (NEG) for the load balancer defined below
resource "google_compute_region_network_endpoint_group" "default" {
  provider              = google-beta
  name                  = "serverless-neg"
  network_endpoint_type = "SERVERLESS"
  region                = var.region
  cloud_run {
    #service  = module.keycloak_service.service_name
    url_mask = var.url_mask
  }
}

# Add the NEG for API proxy
resource "google_compute_region_network_endpoint_group" "api_proxy" {
  provider              = google-beta
  name                  = "api-proxy-neg"
  network_endpoint_type = "SERVERLESS"
  region                = var.region
  cloud_function {
    function = google_cloudfunctions2_function.api_proxy.name
  }
}

# Modify the lb-http module to create its own URL map
module "lb-http" {
  source  = "GoogleCloudPlatform/lb-http/google//modules/serverless_negs"
  version = "~> 12.0.0"
  name    = "load-balancer"
  project = var.project_id

  # Create Google-managed SSL certificates for the specified domains. 
  ssl = "true"
  managed_ssl_certificate_domains = [
    "${local.keycloak_service_name}.opencampus.sh",
    "${local.hasura_service_name}.opencampus.sh",
    "${local.eduhub_service_name}.opencampus.sh",
    "${local.rent_a_scientist_service_name}.opencampus.sh",
    "api.${local.eduhub_service_name}.opencampus.sh"
  ]
  https_redirect            = "true"
  random_certificate_suffix = "true"
  create_url_map            = true

  backends = {
    default = {
      description = null
      groups = [
        {
          group = google_compute_region_network_endpoint_group.default.id
        }
      ]
      enable_cdn              = false
      security_policy         = null
      custom_request_headers  = null
      custom_response_headers = null

      iap_config = {
        enable               = false
        oauth2_client_id     = ""
        oauth2_client_secret = ""
      }
      log_config = {
        enable      = false
        sample_rate = null
      }

      path_rule = []
    }

    api_proxy = {
      description = "Backend for API Proxy Cloud Function"
      groups = [
        {
          group = google_compute_region_network_endpoint_group.api_proxy.id
        }
      ]
      enable_cdn              = false
      security_policy         = null
      custom_request_headers  = null
      custom_response_headers = null

      iap_config = {
        enable               = false
        oauth2_client_id     = ""
        oauth2_client_secret = ""
      }
      log_config = {
        enable      = false
        sample_rate = null
      }

      path_rule = []
    }
  }
}

# Create a custom URL map that routes requests based on hostname
resource "google_compute_url_map" "url_map" {
  name            = "lb-url-map"
  default_service = module.lb-http.backend_services["default"].self_link

  host_rule {
    hosts        = ["api.${local.eduhub_service_name}.opencampus.sh"]
    path_matcher = "api-paths"
  }

  path_matcher {
    name            = "api-paths"
    default_service = module.lb-http.backend_services["api_proxy"].self_link
  }
}

# Update the HTTP proxy to use our custom URL map
resource "google_compute_target_http_proxy" "http_proxy" {
  name    = "lb-http-proxy"
  url_map = google_compute_url_map.url_map.id
}

# Update the HTTPS proxy to use our custom URL map
resource "google_compute_target_https_proxy" "https_proxy" {
  name             = "lb-https-proxy"
  url_map          = google_compute_url_map.url_map.id
  ssl_certificates = module.lb-http.ssl_certificate != null ? [module.lb-http.ssl_certificate] : module.lb-http.ssl_certificates
}


###############################################################################
# Setting the Domains for the Applications using Cloudflaire as a Provider
#####

# Add a domain record for the Keycloak service
resource "cloudflare_record" "keycloak" {
  zone_id = var.cloudflare_zone_id
  name    = local.keycloak_service_name
  type    = "A"
  value   = module.lb-http.external_ip
}

# Add a domain record for the Hasura service
resource "cloudflare_record" "hasura" {
  zone_id = var.cloudflare_zone_id
  name    = local.hasura_service_name
  type    = "A"
  value   = module.lb-http.external_ip
}

# Add a domain record for the Hasura service
resource "cloudflare_record" "eduhub" {
  zone_id = var.cloudflare_zone_id
  name    = local.eduhub_service_name
  type    = "A"
  value   = module.lb-http.external_ip
}

# Add a domain record for the Hasura service
resource "cloudflare_record" "rent_a_scientist" {
  zone_id = var.cloudflare_zone_id
  name    = local.rent_a_scientist_service_name
  type    = "A"
  value   = module.lb-http.external_ip
}

# Add a domain record for the API proxy
resource "cloudflare_record" "api_proxy" {
  zone_id = var.cloudflare_zone_id
  name    = "api.${local.eduhub_service_name}"
  type    = "A"
  value   = module.lb-http.external_ip
  proxied = true
}
