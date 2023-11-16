# Bitcoin rollup tutorial

## ☀️Introduction

In this tutorial, we will explore how to use Rollkit to create sovereign rollups on Bitcoin. First, we will install Bitcoin Core to run a local testnet. Then, we will install and set up a Rollkit node to work with Bitcoin as a data availability layer. Lastly, we'll look at how to create a custom EVM execution environment and how to deploy a sovereign rollup on Bitcoin using Rollkit.

By the end of this tutorial, you will have a good understanding of how Rollkit works and how to create sovereign rollups on Bitcoin using Rollkit. You will also have the knowledge and skills needed to customize Rollkit with different execution environments and data availability layers, opening up new possibilities for creating scalable and efficient blockchain applications.

Read more in our [blog post](../../../blog/sovereign-rollups-on-bitcoin).

![rollkit-bitcoin](/bitcoin-rollkit/rollkit-bitcoin-1.png)

### 📖 The stack

Sovereign rollups on Bitcoin are made possible through a module that allows Rollkit rollups to use Bitcoin for data availability. This integration opens up possibilities for developers to create rollups with arbitrary execution environments that inherit Bitcoin’s data availability guarantees and security guarantees.

The Taproot upgrade and [Ordinals](https://ordinals.com/) usage of Bitcoin for publishing arbitrary data made it possible to integrate Bitcoin as a data availability layer into Rollkit. The modular design of Rollkit allows for easy integration of new data availability layers, making it possible to deploy sovereign rollups on Bitcoin.

The goal of Rollkit is to make it easy to build and customize rollups, enabling developers to build sovereign rollups on Bitcoin or customize Rollkit with different execution environments and data availability layers.

## 💻 Prerequisites

An Ubuntu machine with:

- 8GB RAM
- 160 GB SSD
- Ubuntu 22.10
- 4 core AMD CPU

## 🛠️ Dependency setup

First, make sure to update and upgrade the OS:

```bash
sudo apt update && sudo apt upgrade -y
```

These are essential packages that are necessary to execute many tasks like downloading files, compiling, and monitoring the nodes:

```bash
sudo apt install curl tar wget clang pkg-config libssl-dev jq build-essential git make ncdu snapd npm -y
```

Now, we will install the remaining dependencies.

### 🏃 Golang

We will use golang to build and run our test networks. Install it for AMD with these commands:

```bash
ver="1.19.1"
cd $HOME
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm "go$ver.linux-amd64.tar.gz"
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile
source $HOME/.bash_profile
go version
```

<!-- ### asdf

Install `asdf` to allow us to intall a specific version of NPM easily:

```bash
cd $HOME
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.11.2
echo '. "$HOME/.asdf/asdf.sh"' >> ~/.bashrc
echo '. "$HOME/.asdf/completions/asdf.bash"' >> ~/.bashrc
```

Set the path:

```bash
export PATH=$PATH:~/.asdf/bin/
```

Check that it was installed:

```bash
asdf
```

### 🚀 Node.js

Install `nodejs 16.16.0`:

```bash
asdf plugin add nodejs
asdf install nodejs 16.16.0
asdf local nodejs 16.16.0
source ~/.bashrc
```

Optional: you may need to update NPM:

```bash
npm install -g npm@9.6.0
``` -->

### ⚒️ Foundry

Install Foundry:

```bash
curl -L https://foundry.paradigm.xyz/ | bash
```

Set the path:

```bash
source /root/.bashrc
```

Run this to finish the installation of Foundry:

```bash
foundryup
```

<!-- ### 🧶 Yarn

Install yarn:

```bash
npm install -g yarn
``` -->

<!-- ### 🐳 Docker compose

Install docker-compose:

```bash
apt install docker-compose -y
``` -->

<!-- ### 👷‍♀️ gcc

```bash
apt install gcc -y
``` -->

### 🪙 Install Bitcoin

Running the rollup requires a local regtest Bitcoin node. You can set this up by running the following commands.

Install Bitcoin Core:

```bash
sudo snap install bitcoin-core
```

Check version:

```bash
bitcoin-core.cli --version
```

<!-- ### Install Ignite CLI

```bash
curl https://get.ignite.com/cli@v0.26.1! | bash
```

Check version:

```bash
ignite version
```

Scaffold the chain:

```bash
ignite scaffold chain hello
```

Change into `hello` directory:

```bash
cd hello
``` -->

## 🟢 Running a local Bitcoin network

Set up the config for regtest (local network):

```bash
bitcoin-core.daemon "-chain=regtest" "-rpcport=18332" "-rpcuser=rpcuser" "-rpcpassword=rpcpass" "-fallbackfee=0.000001" "-txindex=1"
```

### 👛 Create a wallet for the chain

Open up a new terminal and run the following to create a wallet:

```bash
bitcoin-core.cli -regtest -rpcport=18332 -rpcuser=rpcuser -rpcpassword=rpcpass createwallet w1
```

Your output will look like:

```console
{
  "name": "w1",
  "warning": ""
}
```

### 🎬 Start generating blocks

Now, generate a new address and mine 101 blocks:

```bash
export COINBASE=$(bitcoin-core.cli -regtest -rpcport=18332 -rpcuser=rpcuser -rpcpassword=rpcpass getnewaddress)
bitcoin-core.cli -regtest -rpcport=18332 -rpcuser=rpcuser -rpcpassword=rpcpass generatetoaddress 101 $COINBASE
```

Next, we'll mine a block every second.

Add this script and remember where you placed it, I am putting it in my root directory:

```shell
# Script to generate a new block every second
# Put this script at the root of your unpacked folder
#!/bin/bash

echo "Generating a block every second. Press [CTRL+C] to stop.."

address=`bitcoin-core.cli -regtest -rpcport=18332 -rpcuser=rpcuser -rpcpassword=rpcpass getnewaddress`

while :
do
        echo "Generate a new block `date '+%d/%m/%Y %H:%M:%S'`"
        bitcoin-core.cli -regtest -rpcport=18332 -rpcuser=rpcuser -rpcpassword=rpcpass generatetoaddress 1 $address
        sleep 1
done
```

Run the following from where you placed your `start.sh` script.
Start generating blocks by running:

```bash
bash start.sh
```

#### 🧊 Block height

Check the current block height:

```bash
bitcoin-core.cli -regtest -rpcport=18332 -rpcuser=rpcuser -rpcpassword=rpcpass getblockcount
```

Your output will look similar to below:

```bash
4980
```

Set a variable for the common flags being used:

```bash
export FLAGS="-regtest -rpcport=18332 -rpcuser=rpcuser -rpcpassword=rpcpass"
```

#### 🧊 Block hash

Check the latest block hash:

```bash
bitcoin-core.cli $FLAGS getblockhash 4980
```

Your output will be the block hash of the height you first queried:

```bash
1d7e98aec3085b615c7c71659768fa42e774a87ab5981597e99794d240fb3db5
```

Set the block hash as a variable:

```bash
export HASH=1d7e98aec3085b615c7c71659768fa42e774a87ab5981597e99794d240fb3db5
```

#### 🧊 Block header

Now to get the block header, run the following command (be sure to replace the hash with yours):

```bash
bitcoin-core.cli $FLAGS getblockheader $HASH
```

Now to finish the exercise, query the height from the block header and the hash:

```bash
bitcoin-core.cli $FLAGS getblockheader $HASH | jq '.height'
```

#### 🎬 Restarting the local network

In the case that you are starting your regtest network again, you can use the following command to clear the old chain history:

```bash
rm -rf ${LOCATION OF .bitcoin folder}
```

## 🏃‍♀️ Running the Ethermint rollup

:::danger
The Ethermint tutorial is currently not supported.
:::

Clone Ethermint:

```bash
git clone https://github.com/celestiaorg/ethermint.git
cd ethermint
git checkout bitcoin-da
make install
```

Initialize the chain:

```bash
bash init.sh
```

Set variables for starting the chain:

```bash
export NAMESPACE=$(openssl rand -hex 8)
```

<!-- export DA_HEIGHT=$(bitcoin-core.cli -regtest -rpcport=18332 -rpcuser=rpcuser rpcpassword=rpcpass getblockcount) -->

Start the chain:

```bash
ethermintd start --rollkit.aggregator true --rollkit.da_layer bitcoin --rollkit.da_config='{"host":"127.0.0.1:18332","user":"rpcuser","pass":"rpcpass","http_post_mode":true,"disable_tls":true}' --rollkit.namespace_id $NAMESPACE --rollkit.da_start_height 1
```

Congratulations! Now that you have your Ethermint and Bitcoin rollup running, you're ready to deploy some smart contracts to the EVM!

### ⚡️ Initialize development environment

First, be sure you have
[installed Foundry](https://book.getfoundry.sh/getting-started/installation.html)
on your local development environment.

Next, create a new project and change into the directory:

```bash
forge init bitcoin-ethermint-app
cd bitcoin-ethermint-app
```

Foundry has created an example smart contract located at `src/Counter.sol`.

:::tip
We will run the commands for the Foundry portion of this
tutorial in the `~/bitcoin-ethermint-app/` directory.
:::

### 📒 Updating the contract and tests

Let's update the contracts to include a basic counter example. Open the
`Counter.sol` file in the `src` directory and add the following code:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Counter {
    int private count;
    
    constructor(int _count) {
        count = _count;
    }

    function incrementCounter() public {
        count += 1;
    }
    function decrementCounter() public {
        count -= 1;
    }

    function getCount() public view returns (int) {
        return count;
    }
}
```

Next, let's create a test for this contract.

Open `test/Counter.T.Sol` and update the code with the following:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import 'src/Counter.sol';

contract CounterTest is Test {
    Counter counter;
    function setUp() public {
        counter = new Counter(10);
    }

    function testGetCount() public {
        int value = counter.getCount();
        assertEq(value, 10);
        emit log_int(value);
    }

    function testIncrement() public {
        counter.incrementCounter();
        counter.incrementCounter();
        int value = counter.getCount();
        assertEq(value, 12);
        emit log_int(value);
    }

    function testDecrement() public {
        counter.decrementCounter();
        int value = counter.getCount();
        assertEq(value, 9);
        emit log_int(value);
    }
}
```

Foundry uses [Dappsys Test](https://book.getfoundry.sh/reference/ds-test.html) to
provide basic logging and assertion functionality. It's included in the Forge
Standard Library.

Here, we are using `assertEq` to assert equality. You can view all of the assertion
functions available
[here](https://book.getfoundry.sh/reference/ds-test.html?highlight=log_int#asserting).

Next, we can test the contract using __Forge__ with the following command:

```bash
forge test -vv
```

A successful test will have output similar to the following:

```bash
[⠊] Compiling...
[⠰] Installing solc version 0.8.17
[⠒] Successfully installed solc 0.8.17
[⠆] Compiling 18 files with 0.8.17
[⠑] Solc 0.8.17 finished in 3.59s
Compiler run successful

Running 3 tests for test/Counter.t.sol:ContractTest
[PASS] testDecrement() (gas: 12350)
Logs:
  9

[PASS] testGetCount() (gas: 8510)
Logs:
  10

[PASS] testIncrement() (gas: 13285)
Logs:
  12

Test result: ok. 3 passed; 0 failed; finished in 2.24ms
```

### 📜 Updating the deployment script

Now that we've tested the contract, let's try deploying it locally using
[Solidity Scripting](https://book.getfoundry.sh/tutorials/solidity-scripting.html).

To do so, update the deloyment script at `script/Counter.s.sol` with the
following code:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {Counter} from "src/Counter.sol";

contract CounterScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        new Counter(10);
        vm.stopBroadcast();
    }
}
```

Now we can use this script to deploy our smart contract to either a live or
test network.

### 🏠 Deploying locally

Next start Anvil, the local testnet:

```bash
anvil --port 9545
```

Once started, Anvil will give you a local RPC endpoint as well as a handful
of Private Keys and Accounts that you can use.

Set `ANVIL_KEY` with one of the private keys generated by running:

```bash
export ANVIL_KEY=<anvil-private-key>
```

And set the RPC URL as an environment variable:

```bash
export RPC_URL=http://127.0.0.1:9545
```

We can now use the local RPC along with one of the private keys to deploy locally:

```bash
forge script script/Counter.s.sol:CounterScript --fork-url \
$RPC_URL  --private-key $ANVIL_KEY --broadcast
```

Once the contract has been deployed locally, Anvil will log out the contract address.

Next, set the contract address as an environment variable:

```bash
export CONTRACT_ADDRESS=<contract-address>
```

We can then test sending transactions to it with `cast send`.

```bash
cast send $CONTRACT_ADDRESS "incrementCounter()" \
--private-key $ANVIL_KEY --rpc-url $RPC_URL
```

We can then perform read operations with `cast call`:

```bash
cast call $CONTRACT_ADDRESS "getCount()(int)" --rpc-url $RPC_URL
```

### 🧪 Deploying to the Ethermint sovereign rollup

Now that we've deployed and tested locally, we can deploy to our
Ethermint chain.

First, we will need to export the private key generated by
the ethermint `init.sh` script:

```bash
PRIVATE_KEY=$(ethermintd keys unsafe-export-eth-key mykey --keyring-backend test)
```

> NOTE: Here, the key name from `init.sh` is `mykey` but you can modify
  the `init.sh` to change the name of your key.

Now, we can start deploying the smart contract to our Ethermint chain.

To do so, run the following script:

```bash
forge script script/Counter.s.sol:CounterScript \
--rpc-url http://127.0.0.1:8545 --private-key $PRIVATE_KEY --broadcast
```

Set the contract address in the output as the `CONTRACT_ADDRESS` variable:

```bash
export CONTRACT_ADDRESS=<new-contract-address>
```

Once the contract has been deployed to the Ethermint rollup, we can
use `cast send` to test sending transactions to it:

```bash
cast send $CONTRACT_ADDRESS "incrementCounter()" \
--rpc-url http://127.0.0.1:8545 --private-key $PRIVATE_KEY 
```

We can then perform read operations with `cast call`:

```bash
cast call $CONTRACT_ADDRESS "getCount()(int)" --rpc-url http://127.0.0.1:8545
```
