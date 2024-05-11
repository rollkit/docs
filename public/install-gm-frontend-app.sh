#!/bin/bash

echo "Downloading GM Frontend tutorial source code..."
git clone https://github.com/rollkit/gm-frontend.git
cd gm-frontend || { echo "Failed to find the downloaded repository"; exit 1; }
echo "Installing dependencies..."
yarn install
echo "Starting dev server..."
yarn run dev
