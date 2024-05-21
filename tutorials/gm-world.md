---
description: Build a sovereign rollup using only Rollkit CLI and a local DA network.
---

# GM world rollup

## 🌞 Introduction {#introduction}

This tutorial will guide you through building a sovereign `gm-world` rollup (`gm` stands for "good morning") using Rollkit. Unlike the [quick start guide](https://rollkit.dev/tutorials/quick-start), this tutorial provides a more practical approach to understanding sovereign rollup development.

We will cover:

- Building and configuring a Cosmos-SDK application-specific rollup blockchain.
- Posting rollup data to a Data Availability (DA) network.
- Executing transactions (the end goal).

No prior understanding of the build process is required, just that it utilizes the [Cosmos SDK](https://github.com/cosmos/cosmos-sdk) for blockchain applications.

<!-- markdownlint-disable MD033 -->
<script setup>
import Callout from '../.vitepress/components/callout.vue'
import constants from '../.vitepress/constants/constants.js'
</script>

:::tip
<Callout />
:::
<!-- markdownlint-enable MD033 -->

## 🛠️ Dependencies {#dependencies}

If you followed the [quick start guide](/tutorials/quick-start), you should have the Rollkit CLI and Golang installed already. If not, here's the script for you:

```bash-vue
curl -sSL https://rollkit.dev/install.sh | sh -s {{constants.rollkitLatestTag}}
```

## 🌐 Running a local DA network {#running-local-da}

Learn to run a local DA network, designed for educational purposes, on your machine.

To set up a local DA network node:

```bash-vue
curl -sSL https://rollkit.dev/install-local-da.sh | bash -s {{constants.localDALatestTag}} 
```

This script builds and runs the node, now listening on port `7980`.

## 🏗️ Building Your Sovereign Rollup {#building-your-sovereign-rollup}

With the local DA network running, let’s prepare your rollup blockchain.

To make it simple, we will download a repository with a `gm-world` rollup that has all app chain config set up for you:

```bash
cd $HOME && bash -c "$(curl -sSL https://rollkit.dev/install-gm-rollup.sh)"
```

## 🧰 Configuring your rollup {#configuring-your-rollup}

Generate rollkit.toml file by running:

```bash
rollkit toml init
```

The output should be similar to this:
```
Found rollup entrypoint: /root/gm/cmd/gmd/main.go, adding to rollkit.toml
Could not find rollup config under gm. Please put the chain.config_dir in the rollkit.toml file manually.
Initialized rollkit.toml file in the current directory.
```

From the output, you can see that the rollup entrypoint is `~/gm/cmd/gmd/main.go`.

Open the rollkit.toml file and under the `[chain]` section set `config_dir` to the `./.gm` directory. Your rollkit.toml file should look like this:

```bash
entrypoint = "./cmd/gmd/main.go"

[chain]
  config_dir = "./.gm"
```

## 🚀 Starting your rollup {#start-your-rollup}

Start the rollup, posting to the local DA network:

```bash
rollkit start --rollkit.aggregator --rollkit.da_address http://localhost:7980
```

Notice how we specified the DA network address. Now you should see the logs of the running node:

```bash
12:21PM INF starting node with ABCI CometBFT in-process module=server
12:21PM INF starting node with Rollkit in-process module=server
12:21PM INF service start impl=multiAppConn module=proxy msg="Starting multiAppConn service"
12:21PM INF service start connection=query impl=localClient module=abci-client msg="Starting localClient service"
12:21PM INF service start connection=snapshot impl=localClient module=abci-client msg="Starting localClient service"
12:21PM INF service start connection=mempool impl=localClient module=abci-client msg="Starting localClient service"
12:21PM INF service start connection=consensus impl=localClient module=abci-client msg="Starting localClient service"
12:21PM INF service start impl=EventBus module=events msg="Starting EventBus service"
12:21PM INF service start impl=PubSub module=pubsub msg="Starting PubSub service"
12:21PM INF Using default mempool ttl MempoolTTL=25 module=BlockManager
12:21PM INF service start impl=IndexerService module=txindex msg="Starting IndexerService service"
12:21PM INF service start impl=RPC module=server msg="Starting RPC service"
12:21PM INF service start impl=Node module=server msg="Starting Node service"
12:21PM INF starting P2P client module=server
12:21PM INF serving HTTP listen address=127.0.0.1:26657 module=server
12:21PM INF listening on address=/ip4/127.0.0.1/tcp/26656/p2p/12D3KooWSicdPmMTLf9fJbSSHZc9UVP1CbNqKPpbYVbgxHvbhAUY module=p2p
12:21PM INF listening on address=/ip4/163.172.162.109/tcp/26656/p2p/12D3KooWSicdPmMTLf9fJbSSHZc9UVP1CbNqKPpbYVbgxHvbhAUY module=p2p
12:21PM INF no seed nodes - only listening for connections module=p2p
12:21PM INF working in aggregator mode block time=1000 module=server
12:21PM INF Creating and publishing block height=22 module=BlockManager
12:21PM INF starting gRPC server... address=127.0.0.1:9290 module=grpc-server
12:21PM INF finalized block block_app_hash=235D3710D61F347DBBBDD6FD63AA7687842D1EF9CB475C712856D7DA32F82F09 height=22 module=BlockManager num_txs_res=0 num_val_updates=0
12:21PM INF executed block app_hash=235D3710D61F347DBBBDD6FD63AA7687842D1EF9CB475C712856D7DA32F82F09 height=22 module=BlockManager
12:21PM INF indexed block events height=22 module=txindex
...
```

Good work so far, we have a Rollup node, DA network node, now we can start submitting transactions.

## 💸 Transactions {#transactions}

First, list your keys:

```bash
rollkit keys list --keyring-backend test
```

You should see an output like the following

```bash
- address: gm18k57hn42ujcccyn0n5v7r6ydpacycn2wkt7uh9
  name: gm-key-2
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"Al92dlOeLpuAiOUSIaJapkIveiwlhlEdz/O5CrniMdwH"}'
  type: local
- address: gm1e4fqspwdsy0dzkmzsdhkadfcrd0udngw0f88pw
  name: gm-key
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AwdsLY+2US2VV+rbyfi60GB4/Ir/FeTIkLJ3CWVhUF6b"}'
  type: local
- address: gm1vvl79phavqruppr6f5zy4ypxy7znshrqam48qy
  name: gm-relay
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AlnSEnBUv5GO86fMWe11qth1+R76g2e1lv8c1FWhLpqP"}'
  type: local
```

For convenience we export two of our keys like this:

```bash
export KEY1=gm18k57hn42ujcccyn0n5v7r6ydpacycn2wkt7uh9
export KEY2=gm1e4fqspwdsy0dzkmzsdhkadfcrd0udngw0f88pw
```

Now let's submit a transaction that sends coins from one account to another (don't worry about all the flags, for now, we just want to submit transaction from a high-level perspective):

```bash
rollkit tx bank send $KEY1 $KEY2 42069stake --keyring-backend test --chain-id gm --fees 5000stake
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
    from_address: gm18k57hn42ujcccyn0n5v7r6ydpacycn2wkt7uh9 
    to_address: gm1e4fqspwdsy0dzkmzsdhkadfcrd0udngw0f88pw
  non_critical_extension_options: []
  timeout_height: "0"
signatures: []
confirm transaction before signing and broadcasting [y/N]: // [!code focus]
```

Confirm and sign the transaction as prompted. now you see the transaction hash at the output:

```bash
//...

txhash: 677CAF6C80B85ACEF6F9EC7906FB3CB021322AAC78B015FA07D5112F2F824BFF
```

## ⚖️ Checking Balances {#balances}

Query balances after the transaction:

```bash
rollkit query bank balances $KEY2
```

The receiver’s balance should show an increase.

```bash
balances: // [!code focus]
- amount: "10000000000000000000042069" // [!code focus]
  denom: stake
pagination:
  next_key: null
  total: "0"
```

For the sender’s balance:

```bash
rollkit query bank balances $KEY1
```

Output:

```bash
balances: // [!code focus]
- amount: "9999999999999999999957931" // [!code focus]
  denom: stake
pagination:
  next_key: null
  total: "0"
```

## 🎉 Next steps

Congratulations! You've built a local rollup that posts to a
local DA network. So far so good, keep diving deeper if you like it. Good luck!
