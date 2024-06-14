#!/bin/bash

echo "Downloading GM tutorial rollup source code..."
git clone https://github.com/rollkit/gm.git
cd gm || { echo "Failed to find the downloaded repository"; exit 1; }
git fetch && git checkout remotes/origin/tutorial-local-da-rollkit
