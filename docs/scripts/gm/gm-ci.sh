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
sudo apt install curl tar wget clang pkg-config libssl-dev jq build-essential bacula-console-qt git make ncdu -y

# install Golang
ver="1.19.1"
cd $HOME
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm "go$ver.linux-amd64.tar.gz"

# set path & check version
cd $HOME
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile
source $HOME/.bash_profile
go version

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

# install ignite
cd $HOME
sudo mkdir -p -m 775 /usr/local/bin
sudo curl https://get.ignite.com/cli! | sudo bash
ignite version

# scaffold gm chain
cd $HOME
rm -rf gm/
ignite scaffold chain gm
cd $HOME/gm

# install Rollkit for Consensus & DA
go mod edit -replace github.com/cosmos/cosmos-sdk=github.com/rollkit/cosmos-sdk@v0.46.7-rollkit-v0.6.0-no-fraud-proofs
go mod edit -replace github.com/tendermint/tendermint=github.com/celestiaorg/tendermint@v0.34.22-0.20221202214355-3605c597500d
go mod tidy
go mod download

# start local DA devnet
cd $HOME
tmux new-session -d -s gm-rollkit
tmux send-keys -t gm-rollkit 'docker run --platform linux/amd64 -p 26650:26657 -p 26659:26659 ghcr.io/celestiaorg/local-celestia-devnet:main' Enter
tmux new-window -t gm-rollkit -n 'check-balance'
tmux send-keys -t gm-rollkit:check-balance 'curl -X GET http://0.0.0.0:26659/balance' Enter

# set variables for the chain
VALIDATOR_NAME=validator1
CHAIN_ID=gm
KEY_NAME=gm-key
KEY_2_NAME=gm-key-2
CHAINFLAG="--chain-id ${CHAIN_ID}"
TOKEN_AMOUNT="10000000000000000000000000stake"
STAKING_AMOUNT="1000000000stake"

# create a random Namespace ID for your rollup to post blocks to
NAMESPACE_ID=$(echo $RANDOM | md5sum | head -c 16; echo;)
echo $NAMESPACE_ID
DA_BLOCK_HEIGHT=$(curl http://0.0.0.0:26650/block | jq -r '.result.block.header.height')
echo $DA_BLOCK_HEIGHT

# build the gm chain with Rollkit
cd $HOME/gm
ignite chain build

# reset any existing genesis/chain data
gmd tendermint unsafe-reset-all

# initialize the validator with the chain ID you set
gmd init $VALIDATOR_NAME --chain-id $CHAIN_ID

# add keys for key 1 and key 2 to keyring-backend test
gmd keys add $KEY_NAME --keyring-backend test
# TODO: pull the address here with bat and set value to send later

gmd keys add $KEY_2_NAME --keyring-backend test
# TODO: pull the address here with bat and set value to send later

# add these as genesis accounts
gmd add-genesis-account $KEY_NAME $TOKEN_AMOUNT --keyring-backend test
gmd add-genesis-account $KEY_2_NAME $TOKEN_AMOUNT --keyring-backend test

# set the staking amounts in the genesis transaction
gmd gentx $KEY_NAME $STAKING_AMOUNT --chain-id $CHAIN_ID --keyring-backend test

# collect genesis transactions
gmd collect-gentxs

# start the chain
# tmux new-window -t gm-rollkit -n 'rollkit-rollup'
# tmux send-keys -t gm-rollkit:rollkit-rollup 'gmd start --rollkit.aggregator true --rollkit.da_layer celestia --rollkit.da_config='{"base_url":"http://localhost:26659","timeout":60000000000,"fee":6000,"gas_limit":6000000}' --rollkit.namespace_id $NAMESPACE_ID --rollkit.da_start_height $DA_BLOCK_HEIGHT' Enter

gmd start --rollkit.aggregator true --rollkit.da_layer celestia --rollkit.da_config='{"base_url":"http://localhost:26659","timeout":60000000000,"fee":6000,"gas_limit":6000000}' --rollkit.namespace_id $NAMESPACE_ID --rollkit.da_start_height $DA_BLOCK_HEIGHT

# make new window in gm-rollkit session for rollkit-node
tmux new-window -t gm-rollkit -n 'rollkit-node'

# send transaction
gmd tx bank send cosmos1ew08l47sra304z6vqn9trsy835x600dzqvdz82 cosmos1pgljtq3a549t70zc0fhl4kze2q3r2tllzt8x0y 42069stake --keyring-backend test -y

# validate `code: 0`

# query balance
gmd query bank balances cosmos1ew08l47sra304z6vqn9trsy835x600dzqvdz82

# validate output that the "amount" is 10000000000000000000042069
