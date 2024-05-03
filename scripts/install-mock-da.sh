#!/bin/bash

echo "Downloading Mock-DA source code..."
git clone https://github.com/rollkit/mock-da.git
cd mock-da || { echo "Failed to find the downloaded repository"; exit 1; }
git checkout $1
echo "Building and installing Mock DA..."
make build
echo "Starting Mock DA..."
./build/mock-da
