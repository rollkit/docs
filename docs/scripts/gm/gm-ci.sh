#!/bin/sh

# reset
cd $HOME
tmux kill-session -t gm-rollkit
rm -rf .gm
rm -rf gm
rm -rf go
rm -rf .ignite

# update dependencies
sudo apt update && sudo apt upgrade -y
sudo apt install curl tar wget clang pkg-config libssl-dev jq build-essential git make ncdu -y

# install Golang
ver="1.19.1"
cd $HOME
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm "go$ver.linux-amd64.tar.gz"

# install Docker
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
docker

# set path & check version
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile
source $HOME/.bash_profile
go version

# install ignite
cd $HOME
sudo mkdir -p -m 775 /usr/local/bin
sudo curl https://get.ignite.com/cli! | sudo bash
ignite version

# scaffold GM chain
cd $HOME
rm -rf gm/
ignite scaffold chain gm
cd $HOME/gm

# install Rollkit for Consensus & DA
go mod edit -replace github.com/cosmos/cosmos-sdk=github.com/rollkit/cosmos-sdk@v0.46.7-rollkit-v0.7.2-no-fraud-proofs
go mod edit -replace github.com/tendermint/tendermint=github.com/celestiaorg/tendermint@v0.34.22-0.20221202214355-3605c597500d
go mod tidy
go mod download

# set up chain
VALIDATOR_NAME=validator1
CHAIN_ID=gm
KEY_NAME=gm-key
CHAINFLAG="--chain-id ${CHAIN_ID}"
TOKEN_AMOUNT="10000000000000000000000000stake"
STAKING_AMOUNT="1000000000stake"

# build chain
ignite chain build

# start local DA devnet
cd $HOME
tmux new-session -d -s gm-rollkit
tmux send-keys -t gm-rollkit 'docker run --platform linux/amd64 -p 26650:26657 -p 26659:26659 ghcr.io/celestiaorg/local-celestia-devnet:main' Enter

# make new window in gm-rollkit session for rollkit-node
tmux new-window -t gm-rollkit -n 'rollkit-node'

# start rollkit node
gmd start --rollkit.aggregator true --rollkit.da_layer celestia --rollkit.da_config='{"base_url":"http://localhost:26659","timeout":60000000000,"fee":6000,"gas_limit":6000000}' --rollkit.namespace_id $(echo $RANDOM | md5sum | head -c 16; echo;) --rollkit.da_start_height $(curl https://rpc-mocha.pops.one/block | jq -r '.result.block.header.height')