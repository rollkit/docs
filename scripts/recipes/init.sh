#!/bin/sh

# set variables for the chain
VALIDATOR_NAME=validator1
CHAIN_ID=recipes
KEY_NAME=recipes-key
CHAINFLAG="--chain-id ${CHAIN_ID}"
TOKEN_AMOUNT="10000000000000000000000000stake"
STAKING_AMOUNT="1000000000stake"

# query the DA Layer start height, in this case we are querying
# an RPC endpoint provided by Celestia Labs. The RPC endpoint is
# to allow users to interact with Celestia's core network by querying
# the node's state and broadcasting transactions on the Celestia
# network. This is for Arabica, if using another network, change the RPC.
DA_BLOCK_HEIGHT=$(curl https://rpc.celestia-arabica-11.com/block | jq -r '.result.block.header.height')
echo -e "\n Your DA_BLOCK_HEIGHT is $DA_BLOCK_HEIGHT \n"

# build the recipes chain with Rollkit
ignite chain build

# reset any existing genesis/chain data
recipesd tendermint unsafe-reset-all

# initialize the validator with the chain ID you set
recipesd init $VALIDATOR_NAME --chain-id $CHAIN_ID

# add key to keyring-backend test
recipesd keys add $KEY_NAME --keyring-backend test

# add a genesis account
recipesd genesis add-genesis-account $KEY_NAME $TOKEN_AMOUNT --keyring-backend test

# set the staking amounts in the genesis transaction
recipesd genesis gentx $KEY_NAME $STAKING_AMOUNT --chain-id $CHAIN_ID --keyring-backend test

# collect genesis transactions
recipesd genesis collect-gentxs

# copy centralized sequencer address into genesis.json
# Note: validator and sequencer are used interchangeably here
ADDRESS=$(jq -r '.address' ~/.recipes/config/priv_validator_key.json)
PUB_KEY=$(jq -r '.pub_key' ~/.recipes/config/priv_validator_key.json)
jq --argjson pubKey "$PUB_KEY" '.consensus["validators"]=[{"address": "'$ADDRESS'", "pub_key": $pubKey, "power": "1000", "name": "Rollkit Sequencer"}]' ~/.recipes/config/genesis.json > temp.json && mv temp.json ~/.recipes/config/genesis.json

# create a restart-testnet.sh file to restart the chain later
[ -f restart-recipes.sh ] && rm restart-recipes.sh
echo "DA_BLOCK_HEIGHT=$DA_BLOCK_HEIGHT" >> restart-recipes.sh

# start your recipes rollup
recipesd start --rollkit.aggregator true --rollkit.da_address=":26650" --rollkit.da_start_height $DA_BLOCK_HEIGHT --rpc.laddr tcp://127.0.0.1:36657 --p2p.laddr "0.0.0.0:36656" --minimum-gas-prices="0.025stake"