#!/bin/sh

# set variables for the chain
VALIDATOR_NAME=validator1
CHAIN_ID=localwasm
KEY_NAME=localwasm-key
TOKEN_AMOUNT="10000000000000000000000000uwasm"
STAKING_AMOUNT=1000000000uwasm
CHAINFLAG="--chain-id ${CHAIN_ID}"
TXFLAG="--chain-id ${CHAIN_ID} --gas-prices 0uwasm --gas auto --gas-adjustment 1.3"

# reset any existing genesis/chain data
wasmd tendermint unsafe-reset-all
wasmd init $VALIDATOR_NAME --chain-id $CHAIN_ID

# update wasmd configuration files to set chain details and enable necessary settings
# the sed commands here are editing various configuration settings for the wasmd instance
# such as setting minimum gas prices, enabling the api, setting the chain id, setting the rpc address,
# adjusting time constants, and setting the denomination for bonds and minting.
sed -i'' -e 's/^minimum-gas-prices *= .*/minimum-gas-prices = "0uwasm"/' "$HOME"/.wasmd/config/app.toml
sed -i'' -e '/\[api\]/,+3 s/enable *= .*/enable = true/' "$HOME"/.wasmd/config/app.toml
sed -i'' -e "s/^chain-id *= .*/chain-id = \"$CHAIN_ID\"/" "$HOME"/.wasmd/config/client.toml
sed -i'' -e '/\[rpc\]/,+3 s/laddr *= .*/laddr = "tcp:\/\/0.0.0.0:26657"/' "$HOME"/.wasmd/config/config.toml
sed -i'' -e 's/"time_iota_ms": "1000"/"time_iota_ms": "10"/' "$HOME"/.wasmd/config/genesis.json
sed -i'' -e 's/bond_denom": ".*"/bond_denom": "uwasm"/' "$HOME"/.wasmd/config/genesis.json
sed -i'' -e 's/mint_denom": ".*"/mint_denom": "uwasm"/' "$HOME"/.wasmd/config/genesis.json

# add a key to keyring-backend test
wasmd keys add $KEY_NAME --keyring-backend test

# add a genesis account
wasmd genesis add-genesis-account $KEY_NAME $TOKEN_AMOUNT --keyring-backend test

# set the staking amounts in the genesis transaction
wasmd genesis gentx $KEY_NAME $STAKING_AMOUNT --chain-id $CHAIN_ID --keyring-backend test

# collect gentxs
wasmd genesis collect-gentxs

# copy centralized sequencer address into genesis.json
# Note: validator and sequencer are used interchangeably here
ADDRESS=$(jq -r '.address' ~/.wasmd/config/priv_validator_key.json)
PUB_KEY=$(jq -r '.pub_key' ~/.wasmd/config/priv_validator_key.json)
jq --argjson pubKey "$PUB_KEY" '.consensus["validators"]=[{"address": "'$ADDRESS'", "pub_key": $pubKey, "power": "1000", "name": "Rollkit Sequencer"}]' ~/.wasmd/config/genesis.json > temp.json && mv temp.json ~/.wasmd/config/genesis.json

echo "wasmd start --rollkit.aggregator --rollkit.da_address http://localhost:7980 --rpc.laddr tcp://127.0.0.1:36657 --grpc.address 127.0.0.1:9290 --p2p.laddr \"0.0.0.0:36656\" --minimum-gas-prices="0.025uwasm"" >> restart-wasmd.sh

# start the chain
wasmd start --rollkit.aggregator --rollkit.da_address http://localhost:7980 --rpc.laddr tcp://127.0.0.1:36657 --grpc.address 127.0.0.1:9290 --p2p.laddr "0.0.0.0:36656" --minimum-gas-prices="0.025uwasm"
