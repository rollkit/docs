#!/bin/bash

echo "Downloading Rollkit source code..."
git clone https://github.com/rollkit/rollkit.git

if ! which go > /dev/null; then
	echo "Go is not installed. Attempting to install Go..."
	if ! which go > /dev/null; then
		curl -sL https://raw.githubusercontent.com/rollkit/docs/main/scripts/install-go.sh | sh
		if ! which go > /dev/null; then
			echo "Failed to install Go. Please install it manually and rerun this script."
			exit 1
		fi
	fi
fi

cd rollkit || { echo "Failed to find the downloaded repository."; exit 1; }
git checkout v0.13.2
echo "Building and installing Rollkit..."
make install
cd ..
echo "Installation completed successfully."

