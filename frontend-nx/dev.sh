#!/bin/sh
set -e  # Exit on error

# Function to start socat proxy
start_proxy() {
    local listen_port=$1
    local target_host=$2
    local target_port=$3
    socat tcp-listen:${listen_port},reuseaddr,fork tcp:${target_host}:${target_port} &
    echo "Started proxy on port ${listen_port} -> ${target_host}:${target_port}"
}

# Function to cleanup background processes
cleanup() {
    echo "Cleaning up processes..."
    kill $(jobs -p) 2>/dev/null || true
    exit 0
}

# Set up trap for cleanup on script exit
trap cleanup EXIT INT TERM

# Start all proxy connections
start_proxy 28080 keycloak 8080
start_proxy 8080 hasura 8080
start_proxy 5000 frontend-nx 4200
start_proxy 5001 frontend-nx 4201
start_proxy 4001 node_functions 4001
start_proxy 42025 python_functions 42025

# Wait a moment for proxies to establish
sleep 2

# Install dependencies with proper error handling
echo "Installing dependencies..."
yarn install --frozen-lockfile || {
    echo "Failed to install dependencies"
    exit 1
}

# Start development servers
echo "Starting development servers..."
npx nx run edu-hub:serve &
EDU_HUB_PID=$!

npx nx run rent-a-scientist:serve &
RENT_SCIENTIST_PID=$!

# Wait for any process to exit
wait -n

# If we get here, one of the processes failed
echo "One of the processes exited unexpectedly"
exit 1
