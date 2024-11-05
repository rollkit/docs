#!/bin/bash

echo "Downloading local sequencer source code..."
git clone https://github.com/rollkit/go-sequencing.git
cd go-sequencing || { echo "Failed to find the downloaded repository"; exit 1; }
git fetch --all --tags
git checkout $1
echo "Building and installing Local Sequencer..."
make build
echo "Starting Local Sequencer..."
./build/local-sequencer -rollup-id $2
