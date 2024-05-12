#!/bin/bash -e

# This script installs or updates to the latest version of Go.
# Multi-platform (Linux and macOS)
# Multi-architecture (amd64, arm64, arm) support

deps=( curl jq )

for dep in "${deps[@]}"; do
	if ! command -v "$dep" &> /dev/null; then
		echo "$dep is not installed. Downloading and executing the script..."
		curl -sSL https://rollkit.dev/install-jq.sh | bash
	fi
done

version="${1:-$(curl -s 'https://go.dev/dl/?mode=json' | jq -r '.[0].version')}"
current="$(/usr/local/go/bin/go version 2>/dev/null | awk '{print $3}')"
if [[ "$current" == "$version" ]]; then
	echo "Go is already up-to-date at version ${version}"
	exit 0
fi

update_go() {
	local arch="$1"
	local os="$2"

	local go_url="https://golang.org/dl/go${version}.${os}-${arch}.tar.gz"

	echo "Downloading Go from ${go_url}"

	curl -so "/tmp/go${version}.${os}-${arch}.tar.gz" -L "$go_url"
	if [ $? -eq 0 ]; then
		tar -C /usr/local -xzf "/tmp/go${version}.${os}-${arch}.tar.gz"
		if [ $? -ne 0 ]; then
			echo "Failed to extract Go. Possibly corrupted download."
			rm "/tmp/go${version}.${os}-${arch}.tar.gz"
			exit 1
		else
			echo "Go updated to version ${version}"
		fi
	else
		echo "Failed to download Go from ${go_url}"
		exit 1
	fi

	rm "/tmp/go${version}.${os}-${arch}.tar.gz"
}

case "$(uname -s)" in
	Linux)
		case "$(uname -m)" in
			armv6l|armv7l)
				update_go "armv6l" "linux"
				;;
			arm64)
				update_go "arm64" "linux"
				;;
			x86_64)
				update_go "amd64" "linux"
				;;
			*)
				echo "Unsupported architecture: $(uname -m)" >&2
				exit 1
				;;
		esac
		;;
	Darwin)
		case "$(uname -m)" in
			arm64)
				update_go "arm64" "darwin"
				;;
			x86_64)
				update_go "amd64" "darwin"
				;;
			*)
				echo "Unsupported architecture: $(uname -m)" >&2
				exit 1
				;;
		esac
		;;
	*)
		echo "Unsupported operating system: $(uname -s)" >&2
		exit 1
		;;
esac

# Define the Go binary path
GO_BIN_PATH="/usr/local/go/bin"

# Function to add path to the specific shell config file
add_path_to_config() {
	local config_file="$1"

    # Check if the Go bin path is already in the config file to prevent duplicates
    if ! grep -q "export PATH=.*$GO_BIN_PATH" "$config_file" ; then
	    echo "export PATH=\$PATH:$GO_BIN_PATH" >> "$config_file"
	    echo "Added $GO_BIN_PATH to $config_file"
    else
	    echo "$GO_BIN_PATH is already in $config_file"
    fi
}

# Determine shell and appropriate config file
if [[ -n "$ZSH_VERSION" ]]; then
	# Assuming the user is using Zsh
	CONFIG_FILE="$HOME/.zshenv"
elif [[ -n "$BASH_VERSION" ]]; then
	# Check if .bash_profile exists, otherwise use .profile
	if [[ -f "$HOME/.bash_profile" ]]; then
		CONFIG_FILE="$HOME/.bash_profile"
	else
		CONFIG_FILE="$HOME/.profile"
	fi
else
	echo "Unsupported shell. Only Bash and Zsh are supported."
	exit 1
fi

# Check if the Go bin path is already in the PATH
if [[ ":$PATH:" != *":$GO_BIN_PATH:"* ]]; then
	echo "Adding $GO_BIN_PATH to PATH."
	add_path_to_config "$CONFIG_FILE"
	# Source the config file to update the current session
	source "$CONFIG_FILE"
	echo "$GO_BIN_PATH added to PATH successfully."
else
	echo "$GO_BIN_PATH is already in PATH."
fi

$(which go) version
