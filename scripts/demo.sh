#!/bin/bash

# Color codes as constants
COLOR_BLUE="34"
COLOR_RED="31"
COLOR_CYAN="36"
COLOR_YELLOW="33"
COLOR_GREEN="32"

# Folder where demo applications reside
DEMO_FOLDER="demo"

# Package manager used for managing dependencies and commands
PACKAGE_MANAGER="pnpm"

# Name of the hidden folder for the Strapi demo app
STRAPI_APP_NAME=".strapi-app"

# Full path to the Strapi demo app within the demo folder
STRAPI_APP_PATH="$DEMO_FOLDER/$STRAPI_APP_NAME"

# Dynamically find subfolders in the $DEMO_FOLDER that do not start with a dot (hidden folders)
# This helps to list all demo applications except for the Strapi app or other hidden artifacts
STRAPI_DEMO_FOLDERS=$(find "$DEMO_FOLDER" -mindepth 1 -maxdepth 1 -type d ! -name ".*")

# Function to print a message in a specified color
colored_echo() {
  local message=$1
  local color=$2

  echo -e "\033[1;${color}m${message}\033[0m"
}

execute() {
  colored_echo "$1" "$COLOR_BLUE"

  # Execute the command and handle any potential errors
  eval "$1" || {
    colored_echo "Error: Command failed - $1" "$COLOR_RED"
    exit 1
  }
}

demo_for_each() {
  # Loop through each application folder found in the STRAPI_DEMO_FOLDERS
  while read -r demo_folder; do
    # Display the folder currently being processed
    colored_echo "Executing in context of \"$demo_folder\"" "$COLOR_CYAN"

    # Execute the given command, passing the current demo folder as an argument
    "$@" "$demo_folder"
  done <<< "$STRAPI_DEMO_FOLDERS"
}

# Install dependencies for the main Strapi app and each demo app
install() {
  app_install                  # Strapi app
  demo_for_each "demo_install" # Install dependencies for each demo
}

# Build the main Strapi app and each demo app
build() {
  app_build                  # Strapi app
  demo_for_each "demo_build" # Build each demo
}

# Build a specific demo app folder if a build script is present in its package.json
demo_build() {
  local demo_folder=$1

  # Run the build script for the demo app
  execute "$PACKAGE_MANAGER -C \"$demo_folder\" run --if-present build"
}

# Install dependencies for a specific demo app folder
demo_install() {
  local demo_folder=$1

  # Run the package manager install command in the demo folder
  execute "$PACKAGE_MANAGER -C \"$demo_folder\" install"
}

# Install dependencies for the Strapi app
app_install() {
  execute "$PACKAGE_MANAGER -C \"$STRAPI_APP_PATH\" install"
}

# Build the Strapi app
app_build() {
  execute "$PACKAGE_MANAGER -C \"$STRAPI_APP_PATH\" run build"
}

# Setup the .env file for the main Strapi app
app_env_setup() {
  local env_file=".env"
  local env_example_file=".env.example"

  # Define paths for the .env file and the .env.example file
  local env_path="$STRAPI_APP_PATH/$env_file"
  local env_example_path="$STRAPI_APP_PATH/$env_example_file"

  # Check if the .env file does not exist
  if [ ! -e "$env_path" ]; then
    colored_echo "⚠ No $env_file file found in the Strapi demo app ($env_path), proceeding with the app env setup" "$COLOR_YELLOW"

    # Create the .env file by copying from the .env.example file
    execute "cp $env_example_path $env_path"

    colored_echo "✔ \"$env_file\" has been successfully generated from \"$env_example_file\"" "$COLOR_GREEN"
  elif [ -e "$env_path" ] && [ ! -f "$env_path" ]; then
    # Error if the path exists but is not a file
    colored_echo "✖ The path exists but is not a file ($env_path), something is off" "$COLOR_RED"
  else
    # If the .env file already exists, skip setup
    colored_echo "✔ Found an $env_file file in the Strapi demo app ($STRAPI_APP_PATH), skipping the app env setup" "$COLOR_GREEN"
  fi
}

# Seed the Strapi app, optionally cleaning the database first
app_seed() {
  local should_clean=$1
  local database_path="$STRAPI_APP_PATH/.tmp/data.db"

  # If "clean" argument is passed, remove the database before seeding
  if [ "$should_clean" = "clean" ]; then
    colored_echo "Cleaning up the Strapi app database before seeding" "$COLOR_CYAN"
    execute "$PACKAGE_MANAGER exec rimraf $database_path"
  fi

  # Run the seed script for the main Strapi app
  execute "$PACKAGE_MANAGER -C $STRAPI_APP_PATH seed:example"
}

# Start the main Strapi app in development mode
app_start() {
  execute "$PACKAGE_MANAGER -C $STRAPI_APP_PATH develop"
}

# Complete setup script: installs dependencies, sets up .env, builds, and seeds the database
setup() {
  colored_echo "Starting setup process..." "$COLOR_CYAN"

  colored_echo "Step 1: Installing all project dependencies..." "$COLOR_YELLOW"
  install || {
    colored_echo "✖ Failed to install dependencies. Exiting setup process." "$COLOR_RED"
    exit 1
  }

  colored_echo "Step 2: Setting up the environment configuration..." "$COLOR_YELLOW"
  app_env_setup || {
    colored_echo "✖ Failed to set up the environment. Exiting setup process." "$COLOR_RED"
    exit 1
  }

  colored_echo "Step 3: Building the projects..." "$COLOR_YELLOW"
  build || {
    colored_echo "✖ Failed to build the projects. Exiting setup process." "$COLOR_RED"
    exit 1
  }

  colored_echo "Step 4: Cleaning and seeding the database..." "$COLOR_YELLOW"
  app_seed "clean" || {
    colored_echo "✖ Failed to seed the database. Exiting setup process." "$COLOR_RED"
    exit 1
  }

  colored_echo "✔ Setup completed successfully!" "$COLOR_GREEN"
}

# Display a help message for using the script
show_help() {
  echo "Usage: ./demo.sh [command]"
  echo
  echo "Commands:"
  echo "  setup             Complete setup: install, env, build, and seed-clean"
  echo "  build             Build the main Strapi app and demo applications"
  echo "  install           Install all dependencies for the main app and demo apps"
  echo "  app:env:setup     Set up the environment configuration for the Strapi app"
  echo "  app:start         Start the Strapi demo app in development mode"
  echo "  app:seed          Seed the Strapi demo app"
  echo "  app:seed:clean    Clean and seed the Strapi demo app"
  echo "  help              Show this help message"
}

# Command handler: runs the appropriate function based on the input command
case "$1" in
"setup") setup ;;
"build") build ;;
"install") install ;;
"app:env") app_env_setup ;;
"app:start") app_start ;;
"app:seed") app_seed ;;
"app:seed:clean") app_seed "clean" ;;
"help" | *) show_help ;;
esac
