#!/bin/bash

echo "Downloading Rollkit source code..."
git clone https://github.com/rollkit/rollkit.git

if ! which go > /dev/null; then
	echo "Go is not installed. Attempting to install Go..."
	curl -sL https://rollkit.dev/install-go.sh | sh -s go1.22.2
fi

cd rollkit || { echo "Failed to find the downloaded repository."; exit 1; }
git checkout $1
echo "Building and installing Rollkit..."
make install
cd ..
echo "Installation completed successfully."

