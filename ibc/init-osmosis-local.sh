KEY="mykey"
CHAINID="osmosis-testnet-1"
MONIKER="localtestnet"
KEYALGO="secp256k1"
KEYRING="test"
LOGLEVEL="info"
# to trace evm
#TRACE="--trace"
TRACE=""
KEY_RELAY="osmosis-relay"
# remove existing daemon
rm -rf ~/.osmosis*


# validate dependencies are installed
command -v jq > /dev/null 2>&1 || { echo >&2 "jq not installed. More info: https://stedolan.github.io/jq/download/"; exit 1; }

update_test_genesis () {
  cat $HOME/.osmosisd/config/genesis.json | jq "$1" > $HOME/.osmosisd/config/tmp_genesis.json && mv $HOME/.osmosisd/config/tmp_genesis.json $HOME/.osmosisd/config/genesis.json
}

# if $KEY exists it should be deleted
osmosisd keys add $KEY --keyring-backend $KEYRING --algo $KEYALGO
echo "milk verify alley price trust come maple will suit hood clay exotic" | osmosisd keys add $KEY_RELAY --keyring-backend $KEYRING --algo $KEYALGO --recover

# Set moniker and chain-id for Evmos (Moniker can be anything, chain-id must be an integer)
osmosisd init $MONIKER --chain-id $CHAINID 

# Allocate genesis accounts (cosmos formatted addresses)
osmosisd add-genesis-account $KEY_RELAY 100000001000009000uosmo,100000000000000utest --keyring-backend $KEYRING 
osmosisd add-genesis-account $KEY 100000001000000000uosmo --keyring-backend $KEYRING

# Sign genesis transaction
osmosisd gentx $KEY 100000001000000000uosmo --keyring-backend $KEYRING --chain-id $CHAINID

# Collect genesis tx
osmosisd collect-gentxs
update_test_genesis '.app_state["mint"]["params"]["mint_denom"]="uosmo"' 
update_test_genesis '.app_state["staking"]["params"]["bond_denom"]="uosmo"' 
update_test_genesis '.app_state["txfees"]["basedenom"]="uosmo"' 

# Run this to ensure everything worked and that the genesis file is setup correctly
osmosisd validate-genesis

if [[ $1 == "pending" ]]; then
  echo "pending mode is on, please wait for the first block committed."
fi

osmosisd config chain-id $CHAINID
osmosisd config keyring-backend $KEYRING

# Start the node (remove the --pruning=nothing flag if historical queries are not needed)
osmosisd start --pruning-keep-recent 10000  --minimum-gas-prices=0.0001uosmo --rpc.laddr tcp://0.0.0.0:46657 --p2p.laddr tcp://0.0.0.0:2240  --grpc.address 0.0.0.0:2242 --grpc-web.address 0.0.0.0:2243 --api.address tcp://127.0.0.1:2317 
