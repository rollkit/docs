# How to use Hyperlane token (TIA) as gas token in your rollup

This guide builds upon [CosmWasm rollup](../tutorials/cosmwasm.md), where you set up a local rollup with integrated CosmWasm. In this guide, we will be exploring how to integrate Hyperlane as a safer IBC alterntive for token transfers in your rollup.

<!-- markdownlint-disable MD033 -->
<script setup>
import Callout from '../.vitepress/components/callout.vue'
</script>

:::tip
<Callout />
:::

<!-- markdownlint-enable MD033 -->

## 💻 Deploy the Hyperlane contracts {#deploy-contracts}

Fork the cw-hyperlane repo:

```bash
git clone --depth 1 --brnach fix-askQuestion git@github.com:Stride-Labs/cw-hyperlane.git
cd cw-hyperlane
```

This is a temporary fix until [many-things/cw-hyperlane#133](https://github.com/many-things/cw-hyperlane/pull/133) is resolved.

#### Create `config.yaml` with our networks setup:

```bash
echo 'networks:
  - id: "localwasmd"
    hrp: "wasm"
    endpoint:
      rpc: "http://localhost:36657"
      rest: "http://localhost:1317"
      grpc: "http://localhost:9090"
    gas:
      price: "0.025"
      denom: "uwasm"
    domain: 1063
  - id: "stride-internal-1"
    hrp: "stride"
    endpoint:
      rpc: "https://stride.testnet-1.stridenet.co"
      rest: "https://stride.testnet-1.stridenet.co/api"
      grpc: "http://stride-testnet-grpc.polkachu.com:12290"
    gas:
      price: "0"
      denom: "ustrd"
    domain: 1651

# wasm133xh839fjn9wxzg6vhc0370lcem8939zr8uu45
# stride133xh839fjn9wxzg6vhc0370lcem8939z2sd4gn
signer: "join always addict position jungle jeans bus govern crack huge photo purse famous live velvet virtual weekend hire cricket media dignity wait load mercy"

deploy:
  ism:
    type: routing
    owner: <signer>
    isms:
      - type: multisig
        owner: <signer>
        validators:
          1651:
            addrs:
              - <signer>
            threshold: 1
  hooks:
    default:
      type: aggregate
      owner: <signer>
      hooks:
        - type: merkle

        - type: igp
          owner: <signer>
          configs:
            1651:
              exchange_rate: 1.5
              gas_price: 5000
          default_gas_usage: 100000

    required:
      type: aggregate
      owner: <signer>
      hooks:
        - type: pausable
          owner: <signer>
          paused: false

        - type: fee
          owner: <signer>
          fee:
            # defaults tp gas denom from network config
            denom: uwasm
            amount: 1' > config.yaml
```

:::tip
The `domain` IDs were generated as a sum or the ascii values of the chain ID, for example:

```python
print(sum(ord(char) for char in "stride-internal-1"))
```

However, you can pick any number as your domain ID.
:::

:::tip
In this guide, we're using a predefined seep phrase for simplicity. Alternativley you can generate and use your own:

```bash
wasmd keys add my-key
```

To get your Stride address, import the generated seed phrase to the `strided` CLI using:

```bash
strided keys add --recover my-key
```

Then fund it using the [Stride testnet faucet](https://stride-faucet.pages.dev).

To get the private key, run:

```bash
wasmd keys export --unsafe --unarmored-hex my-key
```

:::

#### Config the `wasmd` CLI for ease of use:

```bash
wasmd config set client node tcp://127.0.0.1:36657
wasmd config set client output json
wasmd config set client keyring-backend test
```

#### Fund the cw-hyperlane signer in our localwasmd rollup:

```bash
wasmd tx bank send localwasm-key wasm133xh839fjn9wxzg6vhc0370lcem8939zr8uu45 10000000uwasm -y --gas-adjustment 1.5 --gas-prices 0.025uwasm
```

:::info
`localwasm-key` is the genesis validator's address. See https://rollkit.dev/cosmwasm/init.sh for more info.
:::

#### Inside the cw-hyperlane directory, build the Hyperlane contracts:

```bash
yarn install

# Build contracts from local environment
make optimize
# Run compatibility test
make check
```

#### Upload and deploy the contracts on localwasmd:

```bash
# This command will make one file.
# - context with artifacts (default path: {cw-hyperlane-root}/context/localwasmd.json)
yarn cw-hpl upload local -n localwasmd

# This command will output two results.
# - context + deployment    (default path: {cw-hyperlane-root}/context/localwasmd.json)
# - Hyperlane agent-config  (default path: {cw-hyperlane-root}/context/localwasmd.config.json)
yarn cw-hpl deploy -n localwasmd
```

#### Upload and deploy the contracts on the Stride testnet:

```bash
# This command will make one file.
# - context with artifacts (default path: {cw-hyperlane-root}/context/stride-internal-1.json)
yarn cw-hpl upload local -n stride-internal-1

# This command will output two results.
# - context + deployment    (default path: {cw-hyperlane-root}/context/stride-internal-1.json)
# - Hyperlane agent-config  (default path: {cw-hyperlane-root}/context/stride-internal-1.config.json)
yarn cw-hpl deploy -n stride-internal-1
```

#### Setup the relayer config:

```bash
echo '{
  "db": "/tmp/hyperlane/db",
  "relayChains": "localwasmd,strideinternal1",
  "allowLocalCheckpointSyncers": "true",
  "gasPaymentEnforcement": [{ "type": "none" }],
  "whitelist": [
    {
      "origindomain": [1063],
      "destinationDomain": [1651]
    },
    {
      "origindomain": [1651],
      "destinationDomain": [1063]
    }
  ],
  "chains": {
    "localwasmd": {
      "signer": {
        "type": "cosmosKey",
        "key": "0xf0517040b5669e2d93ffac3a3616187b14a19ad7a0657657e0f655d5eced9e31",
        "prefix": "wasm"
      }
    },
    "strideinternal1": {
      "signer": {
        "type": "cosmosKey",
        "key": "0xf0517040b5669e2d93ffac3a3616187b14a19ad7a0657657e0f655d5eced9e31",
        "prefix": "stride"
      }
    }
  }
}' > example/hyperlane/relayer.json
```

#### Setup the validator config on the Stride side:

```bash
echo '{
  "db": "/tmp/hyperlane/db",
  "checkpointSyncer": {
    "type": "localStorage",
    "path": "/tmp/hyperlane/validator/strideinternal1/checkpoint"
  },
  "originChainName": "strideinternal1",
  "validator": {
    "type": "hexKey",
    "key": "0xf0517040b5669e2d93ffac3a3616187b14a19ad7a0657657e0f655d5eced9e31"
  },
  "chains": {
    "strideinternal1": {
      "signer": {
        "type": "cosmosKey",
        "key": "0xf0517040b5669e2d93ffac3a3616187b14a19ad7a0657657e0f655d5eced9e31",
        "prefix": "stride"
      }
    }
  }
}' > example/hyperlane/validator.strideinternal1.json
```

#### Setup the validator config on the localwasmd side:

```bash
echo '{
  "db": "/tmp/hyperlane/db",
  "checkpointSyncer": {
    "type": "localStorage",
    "path": "/tmp/hyperlane/validator/localwasmd/checkpoint"
  },
  "originChainName": "localwasmd",
  "validator": {
    "type": "hexKey",
    "key": "0xf0517040b5669e2d93ffac3a3616187b14a19ad7a0657657e0f655d5eced9e31"
  },
  "chains": {
    "localwasmd": {
      "signer": {
        "type": "cosmosKey",
        "key": "0xf0517040b5669e2d93ffac3a3616187b14a19ad7a0657657e0f655d5eced9e31",
        "prefix": "stride"
      }
    }
  }
}' > example/hyperlane/validator.localwasmd.json
```

### Run this monstrosity (TODO fix ASAP):

```bash
cd ./example

# Merge localwasmd.config.json and agent-config.docker.json
OSMOSISLOCALWASMDTESTNET_AGENT_CONFIG=$(cat ../context/localwasmd.config.json | jq -r '.chains.localwasmd') && \
  LOCALWASMD_AGENT_CONFIG_NAME=$(echo $LOCALWASMD_AGENT_CONFIG | jq -r '.name') && \
    cat ./hyperlane/agent-config.docker.json \
      | jq ".chains.$LOCALWASMD_AGENT_CONFIG_NAME=$(echo $LOCALWASMD_AGENT_CONFIG)" > merge.tmp && \
  mv merge.tmp ./hyperlane/agent-config.docker.json

# Run Hyperlane with docker-compose
docker compose up
```

## Resources

- [Deploying Hyperlane with Osmosis Testnet](https://github.com/many-things/cw-hyperlane/blob/main/DEPLOYMENT.md#4-setup-validator--relayer-config)
- [Hyperlane docs: Deploy Hyperlane](https://docs.hyperlane.xyz/docs/deploy-hyperlane)
