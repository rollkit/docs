CHAIN_ID=gm
BASE_DIR="$HOME/.gm_fn"

rm -rf $BASE_DIR

gmd --home "$BASE_DIR" init FullNode --chain-id $CHAIN_ID

cp -R "$HOME/.gm/config/genesis.json" "$BASE_DIR/config/genesis.json"

DA_BLOCK_HEIGHT=your-block-height
P2P_ID="your-p2p-id"

# uses the same celestia-node as sequencer node
# if you are running a separate celestia-node for full node
# use the auth token from that node
AUTH_TOKEN=$(docker exec $(docker ps -q) celestia bridge auth admin --node.store /home/celestia/bridge)

# rollkit logo
cat <<'EOF'

                 :=+++=.                
              -++-    .-++:             
          .=+=.           :++-.         
       -++-                  .=+=: .    
   .=+=:                        -%@@@*  
  +%-                       .=#@@@@@@*  
    -++-                 -*%@@@@@@%+:   
       .=*=.         .=#@@@@@@@%=.      
      -++-.-++:    =*#@@@@@%+:.-++-=-   
  .=+=.       :=+=.-: @@#=.   .-*@@@@%  
  =*=:           .-==+-    :+#@@@@@@%-  
     :++-               -*@@@@@@@#=:    
        =%+=.       .=#@@@@@@@#%:       
     -++:   -++-   *+=@@@@%+:   =#*##-  
  =*=.         :=+=---@*=.   .=*@@@@@%  
  .-+=:            :-:    :+%@@@@@@%+.  
      :=+-             -*@@@@@@@#=.     
         .=+=:     .=#@@@@@@%*-         
             -++-  *=.@@@#+:            
                .====+*-.  

   ______         _  _  _     _  _   
   | ___ \       | || || |   (_)| |  
   | |_/ /  ___  | || || | __ _ | |_ 
   |    /  / _ \ | || || |/ /| || __|
   | |\ \ | (_) || || ||   < | || |_ 
   \_| \_| \___/ |_||_||_|\_\|_| \__|


EOF

gmd start --rollkit.da_auth_token=$AUTH_TOKEN --rollkit.da_namespace 00000000000000000000000000000000000000000008e5f679bf7116cb --rollkit.da_start_height $DA_BLOCK_HEIGHT --rpc.laddr tcp://127.0.0.1:46657 --grpc.address 127.0.0.1:9390 --p2p.seeds $P2P_ID@127.0.0.1:36656 --p2p.laddr "0.0.0.0:46656" --log_level debug --minimum-gas-prices="0.025stake" --home $BASE_DIR
