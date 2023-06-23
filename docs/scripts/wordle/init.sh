#!/bin/sh

VALIDATOR_NAME=validator1
CHAIN_ID=wordle
KEY_NAME=wordle-key
CHAINFLAG="--chain-id ${CHAIN_ID}"
TOKEN_AMOUNT="10000000000000000000000000stake"
STAKING_AMOUNT="1000000000stake"

NAMESPACE_ID=$(openssl rand -hex 10)
echo $NAMESPACE_ID
DA_BLOCK_HEIGHT=$(curl https://rpc-arabica-8.consensus.celestia-arabica.com/block |jq -r '.result.block.header.height')
echo $DA_BLOCK_HEIGHT

ignite chain build
wordled tendermint unsafe-reset-all
wordled init $VALIDATOR_NAME --chain-id $CHAIN_ID

wordled keys add $KEY_NAME --keyring-backend test
wordled add-genesis-account $KEY_NAME $TOKEN_AMOUNT --keyring-backend test
wordled gentx $KEY_NAME $STAKING_AMOUNT --chain-id $CHAIN_ID --keyring-backend test
wordled collect-gentxs
wordled start --rollkit.aggregator true --rollkit.da_layer celestia --rollkit.da_config='{"base_url":"http://localhost:26659","timeout":60000000000,"fee":6000,"gas_limit":6000000}' --rollkit.namespace_id $NAMESPACE_ID --rollkit.da_start_height $DA_BLOCK_HEIGHT
