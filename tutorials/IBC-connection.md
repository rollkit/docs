# IBC connection tutorial

In this tutorial, we'll learn how to use [an IBC relayer](https://github.com/cosmos/relayer) to
create a IBC connection between a [GM world](./gm-world) rollup and an Osmosis local testnet.

## 💻 Pre-requisites {#prerequisites}

### Software requirements

* Docker running on your machine
* Go version ≥ 1.21.0
* Ignite version ≥ v28.2.0

## Run a GM rollup chain

Before you can create IBC connection, you need to start a
local-celestia-devnet instance in a separate terminal:

```bash
docker run -t -i --platform linux/amd64 -p 26650:26650 -p 26657:26657 -p 26658:26658 -p 26659:26659 -p 9090:9090 ghcr.io/rollkit/local-celestia-devnet:v0.12.7
```

:::warning
You will need to use Ignite v28.2.0, which you can install with:

```bash
curl https://get.ignite.com/cli@v28.2.0! | bash
```

:::

Scaffold the GM chain:

```bash
cd $HOME
ignite scaffold chain gm --address-prefix gm
```

Change into the `gm` directory and install Rollkit with IBC compatibility:

```bash
cd gm
go mod edit -replace github.com/cosmos/cosmos-sdk=github.com/rollkit/cosmos-sdk@v0.50.1-rollkit-v0.12.0-rc0-no-fraud-proofs
go mod tidy
go get github.com/bufbuild/buf@latest
go mod download
```

Now download the script to run the GM chain:

```bash
wget https://raw.githubusercontent.com/rollkit/docs/main/scripts/gm/init-local.sh
```

Run the GM rollup:

```bash
bash init-local.sh
```

:::tip
[See the guidelines in GM world rollup for environment setup](/tutorials/gm-world#building-your-sovereign-rollup).
:::

## Run your local-osmosis-testnet

### Install Osmosis binary

```bash
cd $HOME
git clone https://github.com/osmosis-labs/osmosis
cd osmosis
git checkout v21.0.1
make install
```

### Run local-osmosis-testnet

You also need to start local-osmosis-testnet in a separate terminal by downloading and running this script:

```bash
wget https://raw.githubusercontent.com/rollkit/docs/main/scripts/ibc/init-osmosis-local.sh
```

Run the script:

```bash
bash init-osmosis-local.sh
```

This will start your local Osmosis testnet, we'll create IBC connection between this testnet and GM chain in next step.
> NOTE: Here, the keys name from `init-osmosis-local.sh` is `mykey` and `osmosis-relay` but you can modify
  this script to change the name of your key.

::: tip
We're using the `--rpc.addr [ip:port]` flag to point to port 46657, which is
the custom port to avoid conflicts with other running chains.
:::

## Funds

The following private key has funds on your Osmosis chain:

```bash
Keyname: osmosis-relay
Address: osmo1vvl79phavqruppr6f5zy4ypxy7znshrqm390ll
Mnemonic: "milk verify alley price trust come maple will suit hood clay exotic"
```

The following private key has funds on your GM rollup chain:

```bash
Keyname: gm-relay
Address: gm1vvl79phavqruppr6f5zy4ypxy7znshrqam48qy
Mnemonic: "milk verify alley price trust come maple will suit hood clay exotic"
```

## Setup relayer, create IBC connection and start relaying packets

A relayer is like a middleman for blockchains in the IBC protocol. Instead of directly talking to each other, blockchains communicate through relayers. These relayers keep an eye on the paths that are open between different blockchains. When there's something new or changed, the relayer makes sure the message gets sent to the right place on the other blockchain.

Apart from just passing messages, a relayer can also set up new paths between blockchains. This involves creating clients, connections, and channels, which are like communication channels between the blockchains. So, in simpler terms, a relayer makes sure blockchains can talk to each other smoothly.

### Install relayer

```bash
cd $HOME
git clone https://github.com/cosmos/relayer
cd relayer
git checkout v2.4.2
make install
```

Verify your rly version with `rly version`:

```bash
rly version
```

It should return:

```bash
version: 2.4.2
commit: 259b1278264180a2aefc2085f1b55753849c4815
cosmos-sdk: v0.47.5
go: go1.21.4 darwin/arm64
```

### Setup relayer config

Firstly, generate an empty config file with this command:

```bash
rly config init
```

Afterward, replace the content of the file at `$HOME/.relayer/config/config.yaml` with the following configuration using any text editor you prefer.

```yaml
global:
    api-listen-addr: :5183
    timeout: 10s
    memo: ""
    light-cache-size: 20
chains:
    osmo-local:
        type: cosmos
        value:
            key-directory: /root/.relayer/keys/osmosis-testnet-1
            key: default
            chain-id: osmosis-testnet-1
            rpc-addr: http://localhost:46657 
            account-prefix: osmo
            keyring-backend: test
            gas-adjustment: 1.5
            gas-prices: 0.1uosmo
            min-gas-amount: 100000
            max-gas-amount: 1000000
            debug: true
            timeout: 20s
            block-timeout: ""
            output-format: json
            sign-mode: direct
            extra-codecs: []
            coin-type: 118
            signing-algorithm: ""
            broadcast-mode: batch
            min-loop-duration: 0s
            extension-options: []
            feegrants: null
    gm-local:
        type: cosmos
        value:
            key-directory: /root/.relayer/keys/test
            key: default
            chain-id: gm
            rpc-addr: http://localhost:36657
            account-prefix: gm
            keyring-backend: test
            gas-adjustment: 1.5
            gas-prices: 0.1stake
            min-gas-amount: 100000
            max-gas-amount: 1000000
            debug: true
            timeout: 20s
            block-timeout: ""
            output-format: json
            sign-mode: direct
            extra-codecs: []
            coin-type: 118
            signing-algorithm: ""
            broadcast-mode: batch
            min-loop-duration: 0s
            extension-options: []
            feegrants: null
paths: {}
```

### Create relayer account

Add keys for each chain with this command

The mnemonic-words are the mnemonics you received when initializing the local node. Ensure that each wallet has tokens to start relaying.

```bash
rly keys restore osmo-local default "milk verify alley price trust come maple will suit hood clay exotic"
rly keys restore gm-local default "milk verify alley price trust come maple will suit hood clay exotic"
```

### Create IBC channel

Create a new blank path to be used in generating a new path (connection and client) between two chains

```bash
rly paths new osmosis-testnet-1 gm osmo-gm
```

and then you can create channel with this command

```bash
rly transact link osmo-gm
```

This is a triplewammy, it creates a client, connection, and channel all in one command.

Alternatively, you may create them one by one using these commands:

```bash
rly transact clients osmo-local gm-local osmo-gm
rly transact connection osmo-gm
rly transact channel osmo-gm --src-port transfer --dst-port transfer --order unordered --version ics20-1
```

At the end, it should return something like this :

```bash
2024-02-15T09:22:04.062649Z info Connection handshake termination candidate {"path_name": "osmo-gm", "chain_id": "gm", "client_id": "07-tendermint-0", "termination_client_id": "07-tendermint-0", "observed_client_id": "07-tendermint-0", "termination_counterparty_client_id": "07-tendermint-0", "observed_counterparty_client_id": "07-tendermint-0"}
2024-02-15T09:22:04.062667Z info Found termination condition for connection handshake {"path_name": "osmo-gm", "chain_id": "gm", "client_id": "07-tendermint-0"}
2024-02-15T09:22:04.069040Z info Starting event processor for channel handshake {"src_chain_id": "osmosis-testnet-1", "src_port_id": "transfer", "dst_chain_id": "gm", "dst_port_id": "transfer"}
2024-02-15T09:22:04.070364Z info Chain is in sync {"chain_name": "gm-local", "chain_id": "gm"}
2024-02-15T09:22:04.070389Z info Chain is in sync {"chain_name": "osmo-local", "chain_id": "osmosis-testnet-1"}
2024-02-15T09:22:10.310493Z info Successful transaction {"provider_type": "cosmos", "chain_id": "osmosis-testnet-1", "gas_used": 165662, "fees": "24023uosmo", "fee_payer": "osmo1vvl79phavqruppr6f5zy4ypxy7znshrqm390ll", "height": 12, "msg_types": ["/ibc.core.client.v1.MsgUpdateClient", "/ibc.core.channel.v1.MsgChannelOpenInit"], "tx_hash": "D7E7E6EC0299C120C0E32167C11F0B60921EF88CC6524345BCEB3B266EF727AA"}
2024-02-15T09:22:15.293348Z info Successful transaction {"provider_type": "cosmos", "chain_id": "gm", "gas_used": 171590, "fees": "6510stake", "fee_payer": "gm1vvl79phavqruppr6f5zy4ypxy7znshrqam48qy", "height": 61, "msg_types": ["/ibc.core.client.v1.MsgUpdateClient", "/ibc.core.channel.v1.MsgChannelOpenTry"], "tx_hash": "DE5F15D2CEB85278FA916185A01FBA5DA604563462893288EC7A8745FB597B96"}
2024-02-15T09:22:18.300397Z info Successful transaction {"provider_type": "cosmos", "chain_id": "osmosis-testnet-1", "gas_used": 126689, "fees": "18177uosmo", "fee_payer": "osmo1vvl79phavqruppr6f5zy4ypxy7znshrqm390ll", "height": 14, "msg_types": ["/ibc.core.client.v1.MsgUpdateClient", "/ibc.core.channel.v1.MsgChannelOpenAck"], "tx_hash": "CB1FA1D3309513FC6C8599606DEFE75164F4CAE2ABD101D78133B287862A5ACA"}
2024-02-15T09:22:19.078583Z info Successfully created new channel {"chain_name": "osmo-local", "chain_id": "osmosis-testnet-1", "channel_id": "channel-0", "connection_id": "connection-0", "port_id": "transfer"}
2024-02-15T09:22:23.296353Z info Successful transaction {"provider_type": "cosmos", "chain_id": "gm", "gas_used": 124972, "fees": "4762stake", "fee_payer": "gm1vvl79phavqruppr6f5zy4ypxy7znshrqam48qy", "height": 69, "msg_types": ["/ibc.core.client.v1.MsgUpdateClient", "/ibc.core.channel.v1.MsgChannelOpenConfirm"], "tx_hash": "B917289EC7566B57B2D0EC759F2E703DBD652F9044362E78C05C4F6DF8FD7AC7"}
2024-02-15T09:22:24.080924Z info Successfully created new channel {"chain_name": "gm-local", "chain_id": "gm", "channel_id": "channel-0", "connection_id": "connection-0", "port_id": "transfer"}[!code focus]
2024-02-15T09:22:24.080992Z info Channel handshake termination candidate {"path_name": "osmo-gm", "chain_id": "gm", "client_id": "07-tendermint-0", "termination_port_id": "transfer", "observed_port_id": "transfer", "termination_counterparty_port_id": "transfer", "observed_counterparty_port_id": "transfer"}//[!code focus]
2024-02-15T09:22:24.080998Z info Found termination condition for channel handshake {"path_name": "osmo-gm", "chain_id": "gm", "client_id": "07-tendermint-0"}//[!code focus]
```

::: tip
Notice your `channel_id`, you need to specify it when you make the IBC transfer transaction in next step !
:::

### Start relaying packets

After completing all these steps, you can start relaying with:

```bash
rly start
```

IBC transfer of tokens between `osmosis-testnet-1` and `gm` is now possible.

### Transfer token from rollup chain to osmosis-local

Make an ibc-transfer transaction. This tx will transfer 1000000stake from `gm-key` to receiver address in your local-osmosis chain.

Set your keys and channel ID as variables:

```bash
OSMO_KEY=osmo1vvl79phavqruppr6f5zy4ypxy7znshrqm390ll
GM_KEY=gm1vvl79phavqruppr6f5zy4ypxy7znshrqam48qy
CHANNEL_ID=channel-0
```

```bash
gmd tx ibc-transfer transfer transfer $CHANNEL_ID $OSMO_KEY 42069stake --node tcp://localhost:36657 --chain-id gm --from gm-key --keyring-backend test --fees 5000stake
```

Then check the balance of the receiver address to see if the token has been relayed or not.

```bash
osmosisd query bank balances $OSMO_KEY --node tcp://localhost:46657 --chain-id osmosis-testnet-1
```

The balances query command should return something like this:

```bash
balances:
- amount: "42069"
  denom: ibc/C053D637CCA2A2BA030E2C5EE1B28A16F71CCB0E45E8BE52766DC1B241B77878
- amount: "100000000999876914"
  denom: uosmo
- amount: "100000000000000"
  denom: utest
pagination:
  next_key: null
  total: "0"
```

::: tip
`ibc/64BA6E31FE887D66C6F8F31C7B1A80C7CA179239677B4088BB55F5EA07DBE273` is corresponding IBC denom in osmosis-testnet for native denom `stake` in GM chain. Your hash will be different than this and specific to your channel.
:::

### Transfer token back from osmosis-local to rollup chain

Set your channel hash from the last step:

```bash
IBC_DENOM_STRING=ibc/64BA6E31FE887D66C6F8F31C7B1A80C7CA179239677B4088BB55F5EA07DBE273
```

Make an ibc-transfer transaction:

```bash
osmosisd tx ibc-transfer transfer transfer $CHANNEL_ID $GM_KEY 42069$IBC_DENOM_STRING --node tcp://localhost:46657 --chain-id osmosis-testnet-1 --from osmosis-relay --fees 500uosmo
```

And then check the balances of the receiver address with if it the token is relayed or not:

```bash
gmd query bank balances $GM_KEY --node tcp://localhost:36657 
```

The balances query command should return something like this,
which is close to the original balance, minus some gas fees:

```bash
gmd query bank balances $GM_KEY --node tcp://localhost:36657
balances:
- amount: "9999999999999999999897679"
  denom: stake
pagination:
  total: "1"
```
