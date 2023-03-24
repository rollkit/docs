---
sidebar_position: 2
sidebar_label: Hello world
description: Run your Rollkit rollup while connected to a local Celestia Data Availability network.
---

# 👋 Hello world

:::tip difficulty
Beginner
:::

:::caution Note
This tutorial has only been tested on an AMD machine running Ubuntu 22.10 x64.
:::

This tutorial will teach developers how to easily run a local data availability (DA) devnet on their own machine (or in the cloud).
Running a local devnet for DA to test your rollup is the recommended first step before deploying to a testnet.
This eliminates the need for testnet tokens and deploying to a testnet until you are ready.

The development journey for your rollup will look something like this:

1. Run your rollup and post DA to a local devnet, and make sure everything works as expected
2. Deploy the rollup, posting to a DA testnet. Confirm again that everything is functioning properly
3. Finally, deploy your rollup to the DA Layer's mainnet

Whether you're a developer simply testing things on your laptop or using a virtual machine in the cloud,
this process can be done on any machine of your choosing. We tested it out on a machine with the following specs:

- Memory: 1 GB RAM
- CPU: Single Core AMD
- Disk: 25 GB SSD Storage
- OS: Ubuntu 22.10 x64

## 💻 Prerequisites

- Docker installed on your machine

## 🏠 Running local devnet with a Rollkit rollup

First, run the [`local-celestia-devnet`](https://github.com/celestiaorg/local-celestia-devnet) by running the following command:

```bash
docker run --platform linux/amd64 -p 26650:26657 -p 26659:26659 ghcr.io/celestiaorg/local-celestia-devnet:main
```

:::tip
The above command is different than the command in the [Running a Local Celestia Devnet](http://docs.celestia.org/nodes/local-devnet/) tutorial by Celestia Labs.
Port 26657 on the Docker container in this example will be mapped to the local port 26650. This is to avoid clashing ports with
the Rollkit node, as we're running the devnet and node on one machine.
:::

## 🔎 Query your balance

Open a new terminal instance. Check the balance on your account that you'll be using to post blocks to the
local network, this will make sure you can post rollup blocks to your Celestia Devnet for DA & consensus:

```bash
curl -X GET http://0.0.0.0:26659/balance
```

You will see something like this, denoting your balance in TIA x 10^(-6):

```bash
{"denom":"utia","amount":"999995000000000"}
```

If you want to be able to transpose your JSON results in a nicer format, you can install [`jq`](https://stedolan.github.io/jq/):

```bash
sudo apt install jq
```

:::tip
We'll need `jq` later, so install it!
:::

Then run this to prettify the result:

```bash
curl -X GET http://0.0.0.0:26659/balance | jq
```

Here's what my response was when I wrote this:

```bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    43  100    43    0     0   1730      0 --:--:-- --:--:-- --:--:--  1791
{
  "denom": "utia",
  "amount": "999995000000000"
}
```

If you want to clean it up some more, you can use the `-s` option to run `curl` in silent mode and not print the progress metrics:

```bash
curl -s -X GET http://0.0.0.0:26659/balance | jq
```

Your result will now look like this, nice 🫡

```bash
{
  "denom": "utia",
  "amount": "999995000000000"
}
```

## 🟢 Start, stop, or remove your container

Find the Container ID that is running by using the command:

```bash
docker ps
```

Then stop the container:

```bash
docker stop CONTAINER_ID_or_NAME
```

You can obtain the container ID or name of a stopped container using the `docker ps -a` command, which will list all containers (running and stopped) and their details. For example:

```bash
docker ps -a
```

This will give you an output similar to this:

```bash
CONTAINER ID   IMAGE                                            COMMAND            CREATED         STATUS         PORTS                                                                                                                         NAMES
d9af68de54e4   ghcr.io/celestiaorg/local-celestia-devnet:main   "/entrypoint.sh"   5 minutes ago   Up 2 minutes   1317/tcp, 9090/tcp, 0.0.0.0:26657->26657/tcp, :::26657->26657/tcp, 26656/tcp, 0.0.0.0:26659->26659/tcp, :::26659->26659/tcp   musing_matsumoto
```

In this example, you can restart the container using either its container ID (`d9af68de54e4`) or name (`musing_matsumoto`). To restart the container, run:

```bash
docker start d9af68de54e4
```

or

```bash
docker start musing_matsumoto
```

If you ever would like to remove the container, you can use the `docker rm` command followed by the container ID or name.

Here is an example:

```bash
docker rm CONTAINER_ID_or_NAME
```

## 🏗️ Scaffold your rollup

Now that you have a Celestia devnet running, you are ready to install Golang. We will use Golang to build and run our Cosmos-SDK blockchain.

[Install Golang](https://docs.celestia.org/nodes/environment#install-golang) (*these commands are for amd64/linux*):

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

Now, use the following command to install Ignite CLI:

```bash
curl https://get.ignite.com/cli! | bash
```

:::tip
If you have issues with installation, the full guide can be found [here](https://get.ignite.com/cli) or on [docs.ignite.com](https://docs.ignite.com).
The above command was tested on `amd64/linux`.
:::

Check your version:

```bash
ignite version
```

Scaffold the chain:

```bash
ignite scaffold chain hello
```

Change into the `hello` directory:

```bash
cd hello
```

## 🗞️ Install Rollkit

```bash
go mod edit -replace github.com/cosmos/cosmos-sdk=github.com/rollkit/cosmos-sdk@v0.46.7-rollkit-v0.6.0-no-fraud-proofs
go mod edit -replace github.com/tendermint/tendermint=github.com/celestiaorg/tendermint@v0.34.22-0.20221202214355-3605c597500d
go mod tidy
go mod download
```

## ▶️ Start your rollup

Download the `init.sh` script to start the chain:

```bash
# From inside the `hello` directory
wget https://raw.githubusercontent.com/rollkit/docs/main/docs/scripts/hello/init.sh
```

Run the `init.sh` script:

```bash
bash init.sh
```

This will start your rollup, connected to the local Celestia devnet you have running.

Now let's explore a bit.

### 🔑 Keys

List your keys:

```bash
hellod keys list --keyring-backend test
```

You should see an output like the following

```bash
- address: cosmos1sa3xvrkvwhktjppxzaayst7s7z4ar06rk37jq7
  name: hello-key-2
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AlXXb6Op8DdwCejeYkGWbF4G3pDLDO+rYiVWKPKuvYaz"}'
  type: local
- address: cosmos13nf52x452c527nycahthqq4y9phcmvat9nejl2
  name: hello-key
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AwigPerY+eeC2WAabA6iW1AipAQora5Dwmo1SnMnjavt"}'
  type: local
```

### 💸 Transactions

Now we can test sending a transaction from one of our keys to the other. We can do that with the following command:

```bash
hellod tx bank send [from_key_or_address] [to_address] [amount] [flags]
```

So using our information from the [keys](#keys) command, we can construct the transaction command like so to send 42069stake from one address to another:

```bash
hellod tx bank send cosmos1sa3xvrkvwhktjppxzaayst7s7z4ar06rk37jq7 cosmos13nf52x452c527nycahthqq4y9phcmvat9nejl2 42069stake --keyring-backend test
```

You'll be prompted to accept the transaction:

```bash
auth_info:
  fee:
    amount: []
    gas_limit: "200000"
    granter: ""
    payer: ""
  signer_infos: []
  tip: null
body:
  extension_options: []
  memo: ""
  messages:
  - '@type': /cosmos.bank.v1beta1.MsgSend
    amount:
    - amount: "42069"
      denom: stake
    from_address: cosmos1xwpz06l484xlew98hu74g77wahwatelmz7xm6g
    to_address: cosmos1pgljtq3a549t70zc0fhl4kze2q3r2tllzt8x0y
  non_critical_extension_options: []
  timeout_height: "0"
signatures: []
confirm transaction before signing and broadcasting [y/N]:
```

Type `y` if you'd like to confirm and sign the transaction. Then, you'll see the confirmation:

```bash
code: 0
codespace: ""
data: ""
events: []
gas_used: "0"
gas_wanted: "0"
height: "0"
info: ""
logs: []
raw_log: '[]'
timestamp: ""
tx: null
txhash: 677CAF6C80B85ACEF6F9EC7906FB3CB021322AAC78B015FA07D5112F2F824BFF
```

### ⚖️ Balances

Then, query your balance:

```bash
hellod query bank balances cosmos13nf52x452c527nycahthqq4y9phcmvat9nejl2
```

This is the key that received the balance, so it should have increased past the initial `STAKING_AMOUNT`:

```bash
balances:
- amount: "10000000000000000000042069"
  denom: stake
pagination:
  next_key: null
  total: "0"
```

The other key, should have decreased in balance:

```bash
hellod query bank balances cosmos1sa3xvrkvwhktjppxzaayst7s7z4ar06rk37jq7
```

Response:

```bash
balances:
- amount: "9999999999999999999957931"
  denom: stake
pagination:
  next_key: null
  total: "0"
```
