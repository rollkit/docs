CHAIN_ID=gm
BASE_DIR="$HOME/.fn_gm"

rm -rf $BASE_DIR

gmd --home "$BASE_DIR" init FullNode --chain-id $CHAIN_ID

cp -R "$HOME/.gm/config/genesis.json" "$BASE_DIR/config/genesis.json"

DA_BLOCK_HEIGHT=10163
NAMESPACE_ID="6e9278f8beede9ad1992"

gmd --home $BASE_DIR start --rollkit.da_layer celestia --rollkit.da_config='{"base_url":"http://localhost:26658","timeout":60000000000,"fee":600000,"gas_limit":6000000,"auth_token":"'$AUTH_TOKEN'"}' --rollkit.namespace_id $NAMESPACE_ID --rollkit.da_start_height $DA_BLOCK_HEIGHT --rpc.laddr tcp://127.0.0.1:36657 --grpc.address 127.0.0.1:9390 --grpc-web.address 127.0.0.1:9391 --p2p.seeds 12D3KooWLiJhVnMVwZqSpoCzGoaiPpkiD2i65Ut97MDYguUwDCGC@127.0.0.1:26656 --p2p.laddr "0.0.0.0:36656" --log_level debug