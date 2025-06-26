#!/bin/bash

echo "Downloading Local-DA source code..."
git clone https://github.com/rollkit/rollkit.git
cd rollkit || { echo "Failed to find the downloaded repository"; exit 1; }
make build-da
echo "Starting Local DA..."
./build/local-da
