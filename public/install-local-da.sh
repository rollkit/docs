#!/bin/bash

echo "Downloading Local-DA source code..."
git clone  --depth=1 https://github.com/rollkit/rollkit.git
# TODO : replace with go install once the repo is tagged
cd rollkit || { echo "Failed to find the downloaded repository"; exit 1; }
make build-da
echo "Starting Local DA..."
./build/local-da
