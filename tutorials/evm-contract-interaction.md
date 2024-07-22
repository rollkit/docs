# Smart Contract Interaction on EVM Rollup

In this tutorial, you will deploy a smart contract to your EVM rollup and interact with it on a frontend. This tutorial assumes that you spinned up an EVM rollup, know it's RPC URL, and have funded an account on it.

## Install Foundry

To install Foundry, run the following commands:

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

## Funds

Here is the private key and derived address of the account for you to be used in this tutorial (make sure to fund it with some ETH):

```bash
PrivateKey: 0xfffdbb37105441e14b0ee6330d855d8504ff39e705c3afa8f859ac9865f99306
Address: 0x20f33CE90A13a4b5E7697E3544c3083B8F8A51D4
```
## Frontend

Now we will make a frontend with a smart contract on our EVM rollup. First, clone the GM Portal repository:

```bash
cd $HOME
git clone https://github.com/rollkit/gm-portal.git
cd gm-portal
```

### Deploy the ooga booga portal contract

Next, you will deploy the smart contract.
Export the funded private key and RPC URL:

```bash
export PRIVATE_KEY=0xfffdbb37105441e14b0ee6330d855d8504ff39e705c3afa8f859ac9865f99306
export RPC_URL=<rpc url>
```

Use Foundry to deploy the contract to your EVM:

```bash
cd contracts
forge script script/GmPortal.s.sol:GmPortalScript --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast
```

A successful deployment's output will look similar to:

```bash
forge script script/GmPortal.s.sol:GmPortalScript --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast
[⠒] Compiling...
[⠑] Compiling 18 files with 0.8.20
[⠘] Solc 0.8.20 finished in 1.52s
Compiler run successful!
Script ran successfully.

== Logs ==
  i am a smart contract on EVM x Rollkit. gm!

[...]

##
Waiting for receipts.
⠉ [00:00:00] [######################] 1/1 receipts (0.0s)
##### 2061
✅  [Success]Hash: 0xa174e9389633972458e6dce431d84736e0709e9406c1c3b14b5fa9ae0cdd6860
Contract Address: 0x18Df82C7E422A42D47345Ed86B0E935E9718eBda // [!code focus]
Block: 682
Paid: 0.001528707003566983 ETH (509569 gas * 3.000000007 gwei)

[...]
```

From the contract deployment output, export your contract address:

```bash
export CONTRACT_ADDRESS=0x18Df82C7E422A42D47345Ed86B0E935E9718eBda
```

### Interact with the contract

Send an "ooga booga" to the contract:

```bash
cast send $CONTRACT_ADDRESS \
"gm(string)" "ooga booga" \
--private-key $PRIVATE_KEY \
--rpc-url $RPC_URL
```

Get total (hex-encoded) GMs (ooga boogas):

```bash
cast call $CONTRACT_ADDRESS "getTotalGms()" --rpc-url $RPC_URL
```

### Start and update the frontend

Now, change into the frontend directory:

```bash
cd $HOME/gm-portal/frontend
yarn && yarn dev
```

Now, your frontend is running! We'll display and interact with our smart contract
on our frontend.

First, you will need to change the contract address on  `gm-portal/frontend/src/App.tsx` to your contract address from above before you can interact with the contract on the frontend:

::: tip
**Only if you changed the contract**, you will need to update the ABI in `gm-portal/frontend/GmPortal.json` from `gm-portal/contracts/out/GmPortal.sol/GmPortal.json`. This can be done with:

```bash
cd $HOME
cp gm-portal/contracts/out/GmPortal.sol/GmPortal.json gm-portal/frontend
```
:::

### Interact with the frontend

In order to interact with the contract on the frontend, you'll need to fund an account that you have in your Ethereum wallet
or add the private key from above into your wallet.

To transfer to an external account, use this command:

```bash
export RECEIVER=<receiver ETH address>
cast send --private-key $PRIVATE_KEY $RECEIVER --value 1ether --rpc-url $RPC_URL
```

_If you are in a different terminal than the one you set the private key in originally,
you may need to set it again._

Now, login with your wallet that you funded, and post a ooga booga on your ooga booga portal!

![frontend-evm](/frontend-evm.png)

### Conclusion

You have successfully deployed a smart contract to your EVM rollup and interacted with it on a frontend. You can now build more complex applications on your EVM rollup!
