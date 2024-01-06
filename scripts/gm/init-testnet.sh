#!/bin/sh

# set variables for the chain
VALIDATOR_NAME=validator1
CHAIN_ID=gm
KEY_NAME=gm-key
KEY_2_NAME=gm-key-2
CHAINFLAG="--chain-id ${CHAIN_ID}"
TOKEN_AMOUNT="10000000000000000000000000stake"
STAKING_AMOUNT="1000000000stake"

# create a random Namespace ID for your rollup to post blocks to
NAMESPACE=$(openssl rand -hex 8)
echo $NAMESPACE

# query the DA Layer start height, in this case we are querying
# an RPC endpoint provided by Celestia Labs. The RPC endpoint is
# to allow users to interact with Celestia's core network by querying
# the node's state and broadcasting transactions on the Celestia
# network. This is for Arabica, if using another network, change the RPC.
DA_BLOCK_HEIGHT=$(curl https://rpc.celestia-arabica-11.com/block | jq -r '.result.block.header.height')
echo -e "\n Your DA_BLOCK_HEIGHT is $DA_BLOCK_HEIGHT \n"

# build the gm chain with Rollkit
ignite chain build

# reset any existing genesis/chain data
gmd tendermint unsafe-reset-all

# initialize the validator with the chain ID you set
gmd init $VALIDATOR_NAME --chain-id $CHAIN_ID

# add keys for key 1 and key 2 to keyring-backend test
gmd keys add $KEY_NAME --keyring-backend test
gmd keys add $KEY_2_NAME --keyring-backend test

# add these as genesis accounts
gmd genesis add-genesis-account $KEY_NAME $TOKEN_AMOUNT --keyring-backend test
gmd genesis add-genesis-account $KEY_2_NAME $TOKEN_AMOUNT --keyring-backend test

# set the staking amounts in the genesis transaction
gmd genesis gentx $KEY_NAME $STAKING_AMOUNT --chain-id $CHAIN_ID --keyring-backend test

# collect genesis transactions
gmd genesis collect-gentxs

# copy centralized sequencer address into genesis.json
# Note: validator and sequencer are used interchangeably here
ADDRESS=$(jq -r '.address' ~/.gm/config/priv_validator_key.json)
PUB_KEY=$(jq -r '.pub_key' ~/.gm/config/priv_validator_key.json)
jq --argjson pubKey "$PUB_KEY" '.consensus["validators"]=[{"address": "'$ADDRESS'", "pub_key": $pubKey, "power": "1000", "name": "Rollkit Sequencer"}]' ~/.gm/config/genesis.json > temp.json && mv temp.json ~/.gm/config/genesis.json

# export the Celestia light node's auth token to allow you to submit
# PayForBlobs to Celestia's data availability network
# this is for Arabica, if using another network, change the network name
export AUTH_TOKEN=$(celestia light auth admin --p2p.network arabica)

# create a restart-testnet.sh file to restart the chain later
[ -f restart-testnet.sh ] && rm restart-testnet.sh
echo "DA_BLOCK_HEIGHT=$DA_BLOCK_HEIGHT" >> restart-testnet.sh

echo "gmd start --rollkit.aggregator true --rollkit.da_address=":26650" --rollkit.da_start_height \$DA_BLOCK_HEIGHT --rpc.laddr tcp://127.0.0.1:36657 --p2p.laddr "0.0.0.0:36656" --minimum-gas-prices="0.025stake"" >> restart-testnet.sh

# start the chain
gmd start --rollkit.aggregator true --rollkit.da_address=":26650" --rollkit.da_start_height $DA_BLOCK_HEIGHT --rpc.laddr tcp://127.0.0.1:36657 --p2p.laddr "0.0.0.0:36656" --minimum-gas-prices="0.025stake"