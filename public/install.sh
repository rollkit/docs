#!/bin/bash

# Function to compare versions
compare_versions() {
    if [ "$(printf '%s\n' "$1" "$2" | sort -V | head -n1)" = "$1" ]; then
        if [ "$1" = "$2" ]; then
            return 0 # Equal
        else
            return 1 # First is less
        fi
    else
        return 2 # First is greater
    fi
}

# Step 1: Download Rollkit source code
echo "Downloading Rollkit source code..."
git clone https://github.com/rollkit/rollkit.git

# Navigate into the Rollkit repository
cd rollkit || { echo "Failed to find the downloaded repository."; exit 1; }

# Step 2: Extract the Go version from the go.mod file in the Rollkit repo
go_mod_version=$(grep "^go " go.mod | cut -d' ' -f2)

# Check if go.mod version was found
if [ -z "$go_mod_version" ]; then
    echo "Error: Could not find a Go version in go.mod."
    exit 1
fi

# Format Go version for installation (e.g., "1.22.2" -> "go1.22.2")
formatted_go_version="go${go_mod_version}"

# Step 3: Check if Go is installed
if ! which go > /dev/null; then
    echo "Go is not installed. Attempting to install Go..."
    curl -sL "https://rollkit.dev/install-go.sh" | sh -s "$formatted_go_version"
fi

# Get the installed Go version
installed_version=$(go version | awk '{print $3}' | sed 's/go//')

# Step 4: Validate installed version
compare_versions "$installed_version" "$go_mod_version"
comparison_result=$?

if [ $comparison_result -eq 1 ]; then
    echo "ERROR: The installed Go version ($installed_version) is less than the required version ($go_mod_version)."
    echo "       Please upgrade your version of go."
    exit 1
elif [ $comparison_result -eq 2 ]; then
    echo "INFO: The installed Go version ($installed_version) is greater than the required version ($go_mod_version)."
    echo "      If you run into issues try downgrading your version of go."
fi

# Step 5: Continue with the installation of Rollkit
echo "Fetching and checking out the specified branch or tag..."
git fetch && git checkout "$1"

echo "Building and installing Rollkit..."
make install

cd ..
echo "Installation completed successfully."
echo "Cleaning up downloads..."
rm -rf rollkit

