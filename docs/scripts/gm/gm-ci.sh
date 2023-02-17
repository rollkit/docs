#!/bin/sh

# reset
cd $HOME
tmux kill-session -t hello-rollkit
rm -rf .hello
rm -rf hello
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

# scaffold hello chain
cd $HOME
rm -rf hello/
ignite scaffold chain hello
cd $HOME/hello

# install Rollkit for Consensus & DA
go mod edit -replace github.com/cosmos/cosmos-sdk=github.com/rollkit/cosmos-sdk@v0.46.7-rollkit-v0.6.0-no-fraud-proofs
go mod edit -replace github.com/tendermint/tendermint=github.com/celestiaorg/tendermint@v0.34.22-0.20221202214355-3605c597500d
go mod tidy
go mod download

# start local DA devnet
cd $HOME
tmux new-session -d -s hello-rollkit
tmux send-keys -t hello-rollkit 'docker run --platform linux/amd64 -p 26650:26657 -p 26659:26659 ghcr.io/celestiaorg/local-celestia-devnet:main' Enter
tmux new-window -t hello-rollkit -n 'check-balance'
tmux send-keys -t hello-rollkit:check-balance 'curl -X GET http://0.0.0.0:26659/balance' Enter

# set variables for the chain
VALIDATOR_NAME=validator1
CHAIN_ID=hello
KEY_NAME=hello-key
KEY_2_NAME=hello-key-2
CHAINFLAG="--chain-id ${CHAIN_ID}"
TOKEN_AMOUNT="10000000000000000000000000stake"
STAKING_AMOUNT="1000000000stake"

# create a random Namespace ID for your rollup to post blocks to
NAMESPACE_ID=$(echo $RANDOM | md5sum | head -c 16; echo;)
echo $NAMESPACE_ID
DA_BLOCK_HEIGHT=$(curl http://0.0.0.0:26650/block | jq -r '.result.block.header.height')
echo $DA_BLOCK_HEIGHT

# build the hello chain with Rollkit
cd $HOME/hello
ignite chain build

# reset any existing genesis/chain data
hellod tendermint unsafe-reset-all

# initialize the validator with the chain ID you set
hellod init $VALIDATOR_NAME --chain-id $CHAIN_ID

# add keys for key 1 and key 2 to keyring-backend test
hellod keys add $KEY_NAME --keyring-backend test
# TODO: pull the address here with bat and set value to send later

hellod keys add $KEY_2_NAME --keyring-backend test
# TODO: pull the address here with bat and set value to send later

# add these as genesis accounts
hellod add-genesis-account $KEY_NAME $TOKEN_AMOUNT --keyring-backend test
hellod add-genesis-account $KEY_2_NAME $TOKEN_AMOUNT --keyring-backend test

# set the staking amounts in the genesis transaction
hellod gentx $KEY_NAME $STAKING_AMOUNT --chain-id $CHAIN_ID --keyring-backend test
hellod gentx $KEY_2_NAME $STAKING_AMOUNT --chain-id $CHAIN_ID --keyring-backend test

# collect genesis transactions
hellod collect-gentxs

# start the chain
tmux new-window -t hello-rollkit -n 'rollkit-rollup'
tmux send-keys -t hello-rollkit:rollkit-rollup 'hellod start --rollkit.aggregator true --rollkit.da_layer celestia --rollkit.da_config='{"base_url":"http://localhost:26659","timeout":60000000000,"fee":6000,"gas_limit":6000000}' --rollkit.namespace_id $NAMESPACE_ID --rollkit.da_start_height $DA_BLOCK_HEIGHT
' Enter

# make new window in hello-rollkit session for rollkit-node
tmux new-window -t hello-rollkit -n 'rollkit-node'

# send transaction

# validate output