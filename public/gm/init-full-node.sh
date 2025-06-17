CHAIN_ID=gm
BASE_DIR="$HOME/.gm_fn"
P2P_ID="your-p2p-id"

# notice that this will remove the existing rollkit.toml that was used to run sequencing node 
# if you need to run sequencing node again, you should update config_dir to the $HOME/gm/.gm
rm -rf $BASE_DIR rollkit.toml

cat << EOF > rollkit.toml
entrypoint = "$HOME/gm/cmd/gmd/main.go"

[chain]
  config_dir = "$BASE_DIR"
EOF

rollkit rebuild

rollkit init FullNode --chain-id $CHAIN_ID

cp -R "$HOME/gm/.gm/config/genesis.json" "$BASE_DIR/config/genesis.json"

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

rollkit start --rollkit.da.address http://127.0.0.1:7980 --rpc.laddr tcp://127.0.0.1:46657 --grpc.address 127.0.0.1:9390 --p2p.seeds $P2P_ID@127.0.0.1:36656 --p2p.laddr "0.0.0.0:46656" --log_level debug --minimum-gas-prices="0.025stake"
