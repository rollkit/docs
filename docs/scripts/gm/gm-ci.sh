#!/bin/sh

# reset
cd $HOME
tmux kill-session -t gm-rollkit
rm -rf .celestia-light-mocha/
rm -rf celestia-node
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

# set path & check version
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile
source $HOME/.bash_profile
go version

# install Celestia Node
cd $HOME
git clone https://github.com/celestiaorg/celestia-node.git
cd $HOME/celestia-node/
git checkout tags/v0.6.2-rc1
make install
make cel-key

# create new key
# export ADDRESS=$(./cel-key add my_celes_key --keyring-backend test --node.type light)
# export PRIVATE_KEY=$(./cel-key export my_celes_key --unsafe --unarmored-hex --keyring-backend test --node.type light --p2p.network mocha)

# log versions
celestia version

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
go mod edit -replace github.com/cosmos/cosmos-sdk=github.com/rollkit/cosmos-sdk@v0.46.7-rollkit-v0.6.0-no-fraud-proofs
go mod edit -replace github.com/tendermint/tendermint=github.com/celestiaorg/tendermint@v0.34.22-0.20221202214355-3605c597500d
go mod tidy
go mod download

# scaffold GM query
ignite scaffold query gm --response text -y

# add "gm world!" to query
sed -i 's/\.QueryGmResponse{}, nil/.QueryGmResponse{Text: "gm world!"}, nil/g' x/gm/keeper/query_gm.go

# set up chain
VALIDATOR_NAME=validator1
CHAIN_ID=gm
KEY_NAME=gm-key
CHAINFLAG="--chain-id ${CHAIN_ID}"
TOKEN_AMOUNT="10000000000000000000000000stake"
STAKING_AMOUNT="1000000000stake"

# build chain
ignite chain build

# init chain and add genesis accounts
gmd tendermint unsafe-reset-all
gmd init $VALIDATOR_NAME --chain-id $CHAIN_ID
gmd keys add $KEY_NAME --keyring-backend test
gmd add-genesis-account $KEY_NAME $TOKEN_AMOUNT --keyring-backend test
gmd gentx $KEY_NAME $STAKING_AMOUNT --chain-id $CHAIN_ID --keyring-backend test
gmd collect-gentxs

# start light node
cd $HOME
tmux new-session -d -s gm-rollkit
tmux send-keys -t gm-rollkit 'celestia light init --p2p.network mocha' Enter
tmux send-keys -t gm-rollkit 'celestia light start --core.ip https://rpc-mocha.pops.one --core.grpc.port 9090 --gateway --gateway.addr 127.0.0.1 --gateway.port 26659 --p2p.network mocha' Enter

# make new window in gm-rollkit session for rollkit-node
tmux new-window -t gm-rollkit -n 'rollkit-node'

# start rollkit node
gmd start --rollkit.aggregator true --rollkit.da_layer celestia --rollkit.da_config='{"base_url":"http://localhost:26659","timeout":60000000000,"fee":6000,"gas_limit":6000000}' --rollkit.namespace_id $(echo $RANDOM | md5sum | head -c 16; echo;) --rollkit.da_start_height $(curl https://rpc-mocha.pops.one/block | jq -r '.result.block.header.height')

# make new window in gm-rollkit session and echo mnemonic
# tmux new-window -t gm-rollkit -n 'mnemonic'
# tmux send-keys -t gm-rollkit:mnemonic 'echo ${ADDRESS}' Enter 'echo${PRIVATE_KEY}' Enter

# enter tmux
# tmux attach -t gm-rollkit:rollkit-node

# find out how to test this correctly, even if block is not included on celestia, the query will return "gm world!"
# # make new window in gm-rollkit session to test gm query
# tmux new-window -t gm-rollkit -n 'gm-query'
# tmux send-keys -t gm-rollkit:gm-query 'gmd query gm gm' Enter