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

As we moved into more advanced use cases we use [kurtosis](https://docs.kurtosis.com/) to help with managing all the services we need to run. You can [install kurtosis here](https://docs.kurtosis.com/install). 

Once installed you can verify the installation by running:

```bash
$ kurtosis version

CLI Version:   0.90.1

To see the engine version (provided it is running): kurtosis engine status
```

## 🚀 Starting your rollup {#start-your-rollup}

Now that we have kurtosis, we can launch our GM rollup along with the local DA by running the following command:

```bash
kurtosis run github.com/rollkit/gm@v0.2.0
```

You should see an output like this:

```bash
INFO[2024-07-02T11:15:43-04:00] Creating a new enclave for Starlark to run inside...
INFO[2024-07-02T11:15:46-04:00] Enclave 'sparse-grotto' created successfully
INFO[2024-07-02T11:15:46-04:00] Executing Starlark package at '/Users/matt/Code/rollkit/gm' as the passed argument '.' looks like a directory
INFO[2024-07-02T11:15:46-04:00] Compressing package 'github.com/rollkit/gm' at '.' for upload
INFO[2024-07-02T11:15:46-04:00] Uploading and executing package 'github.com/rollkit/gm'

Container images used in this run:
> ghcr.io/rollkit/gm:05bd40e - locally cached
> ghcr.io/rollkit/local-da:v0.2.1 - locally cached

Printing a message
Adding Local DA service

Adding service with name 'local-da' and image 'ghcr.io/rollkit/local-da:v0.2.1'
Service 'local-da' added with service UUID '990942dc84ab4b3ab2c8d64002a5bafa'

Printing a message
Adding GM service

Printing a message
NOTE: This can take a few minutes to start up...

Adding service with name 'gm' and image 'ghcr.io/rollkit/gm:05bd40e'
Service 'gm' added with service UUID 'ed0233f8291d4a42bdd0e173393af809'

Starlark code successfully run. No output was returned.

⭐ us on GitHub - https://github.com/kurtosis-tech/kurtosis
INFO[2024-07-02T11:15:50-04:00] ======================================================
INFO[2024-07-02T11:15:50-04:00] ||          Created enclave: sparse-grotto          ||
INFO[2024-07-02T11:15:50-04:00] ======================================================
Name:            sparse-grotto
UUID:            49dd471ac3bb
Status:          RUNNING
Creation Time:   Tue, 02 Jul 2024 11:15:43 EDT
Flags:

========================================= Files Artifacts =========================================
UUID   Name

========================================== User Services ==========================================
UUID           Name       Ports                                          Status
ed0233f8291d   gm         jsonrpc: 26657/tcp -> http://127.0.0.1:26657   RUNNING
990942dc84ab   local-da   jsonrpc: 7980/tcp -> http://127.0.0.1:7980     RUNNING
```

Kurtosis has successfully launched the GM rollup and the local DA network. The GM rollup is running on port `26657` and the local DA network is running on port `7980`. You can see the services running in docker as well:

```bash
$ docker ps
CONTAINER ID   IMAGE                             COMMAND                  CREATED          STATUS          PORTS                                                                              NAMES
af16c1a5e68c   ghcr.io/rollkit/gm:05bd40e        "/bin/sh -c 'rollkit…"   46 seconds ago   Up 45 seconds   0.0.0.0:26657->26657/tcp                                                           gm--ed0233f8291d4a42bdd0e173393af809
9db601efd92b   ghcr.io/rollkit/local-da:v0.2.1   "local-da -listen-all"   46 seconds ago   Up 46 seconds   0.0.0.0:7980->7980/tcp                                                             local-da--990942dc84ab4b3ab2c8d64002a5bafa
7fec3d659452   kurtosistech/core:0.90.1          "/bin/sh -c ./api-co…"   50 seconds ago   Up 50 seconds   0.0.0.0:59855->7443/tcp                                                            kurtosis-api--49dd471ac3bb413d96932d4020c20b21
198f7873bbec   fluent/fluent-bit:1.9.7           "/fluent-bit/bin/flu…"   51 seconds ago   Up 51 seconds   2020/tcp                                                                           kurtosis-logs-collector--49dd471ac3bb413d96932d4020c20b21
f921884f4132   kurtosistech/engine:0.90.1        "/bin/sh -c ./kurtos…"   2 hours ago      Up 2 hours      0.0.0.0:8081->8081/tcp, 0.0.0.0:9710-9711->9710-9711/tcp, 0.0.0.0:9779->9779/tcp   kurtosis-engine--1657ab3f1c3942658a3993a0e3b54327
c5363b77b543   traefik:2.10.6                    "/bin/sh -c 'mkdir -…"   2 hours ago      Up 2 hours      80/tcp, 0.0.0.0:9730-9731->9730-9731/tcp                                           kurtosis-reverse-proxy--1657ab3f1c3942658a3993a0e3b54327
39eb05e1c693   timberio/vector:0.31.0-debian     "/bin/sh -c 'printf …"   2 hours ago      Up 2 hours                                                                                         kurtosis-logs-aggregator
```

We can see the GM rollup running in container `gm--ed0233f8291d4a42bdd0e173393af809` and the local DA network running in container `local-da--990942dc84ab4b3ab2c8d64002a5bafa`.

You can verify the rollup is running by checking the logs:

```bash
$ docker logs gm--ed0233f8291d4a42bdd0e173393af809
...
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

Since our rollup is running in a docker container, we want to enter the docker container to interact with it via the Rollkit CLI. We can do this by running:

```bash
docker exec -it gm--ed0233f8291d4a42bdd0e173393af809 sh
```

First, list your keys:

```bash
rollkit keys list --keyring-backend test
```

You should see an output like the following

```bash
- address: gm17rpwv7lnk96ka00v93rphhvcqqztpn896q0dxx
  name: alice
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"A5WPM5WzfNIPrGyha/TlHt0okdlzS1O4Gb1d1kU+xuG+"}'
  type: local
- address: gm1r2udsh4za7r7sxvzy496qfazvjp04j4zgytve3
  name: bob
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"A+jOX/CWInFer2IkqgXGo0da9j7Ubq+e1LJWzTMDjwdt"}'
  type: local
```

For convenience we export two of our keys like this:

```bash
export KEY1=gm17rpwv7lnk96ka00v93rphhvcqqztpn896q0dxx
export KEY2=gm1r2udsh4za7r7sxvzy496qfazvjp04j4zgytve3
```

Now let's submit a transaction that sends coins from one account to another (don't worry about all the flags, for now, we just want to submit transaction from a high-level perspective):

```bash
rollkit tx bank send $KEY2 $KEY1 42069stake --keyring-backend test --chain-id gm --fees 5000stake
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
    from_address: gm1r2udsh4za7r7sxvzy496qfazvjp04j4zgytve3
    to_address: gm17rpwv7lnk96ka00v93rphhvcqqztpn896q0dxx
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
rollkit query bank balances $KEY1
```

The receiver’s balance should show an increase.

```bash
balances: // [!code focus]
- amount: "42069" // [!code focus]
  denom: stake
pagination:
  next_key: null
  total: "0"
```

For the sender’s balance:

```bash
rollkit query bank balances $KEY2
```

Output:

```bash
balances: // [!code focus]
- amount: "99957931" // [!code focus]
  denom: stake
pagination:
  next_key: null
  total: "0"
```

## 📦 GM world UI app

Now that you have an idea of how to interact with the rollup with the rollkit CLI, let's look at the user interface (UI) application aspect of connecting a wallet to a rollup. 

Connecting your wallet to your rollup is as straightforward as connecting to any other blockchain. It assumes you have the [Keplr](https://www.keplr.app/) wallet extension installed in your browser.

## 🔗 Connecting your wallet

Kurtosis spun up a UI app alongside your rollup already, so to connect your Keplr wallet to the application, simply open your browser and go to [http://localhost:3000](https://localhost:3000).

Click the "Connect Wallet" button on the page, and approve the connection request in the Keplr prompt.

Once authorized, your wallet address will be displayed, confirming that your wallet is successfully connected.

![gm-world-frontend-connected](/img/gm-world-frontend-wallet-connected.png)

:::tip
If you run into any issues, make sure your Keplr wallet is updated and set to connect to your local environment.
:::

## 🎉 Next steps

Congratulations! You've experienced connecting to a rollup from the user side — simple and straightforward. Now, you might consider exploring how to add more application logic to your rollup using the Cosmos SDK, as demonstrated in our Wordle App tutorial.
