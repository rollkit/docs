#!/bin/bash

echo "Downloading Local-DA source code..."
git clone https://github.com/rollkit/local-da.git
cd local-da || { echo "Failed to find the downloaded repository"; exit 1; }
git checkout $1
echo "Building and installing Local DA..."
make build
echo "Starting Local DA..."
./build/local-da
