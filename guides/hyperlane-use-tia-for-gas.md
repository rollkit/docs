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

## 📝 In short, deploy a CosmWasm rollup

This is a gist of the [CosmWasm rollup](../tutorials/cosmwasm.md) guide.

```bash
git clone --branch v0.50.0 --depth 1 https://github.com/CosmWasm/wasmd.git
cd wasmd
go mod edit -replace github.com/cosmos/cosmos-sdk=github.com/rollkit/cosmos-sdk@v0.50.6-rollkit-v0.13.3-no-fraud-proofs
go mod tidy -compat=1.17
go mod download
```

Comment out lines 898-900 in `app/app.go`:

```bash
echo 'diff --git a/app/app.go b/app/app.go
index 5c67ba31..797b6bf4 100644
--- a/app/app.go
+++ b/app/app.go
@@ -895,9 +895,6 @@ func NewWasmApp(
 	// At startup, after all modules have been registered, check that all proto
 	// annotations are correct.
 	protoFiles, err := proto.MergedRegistry()
-	if err != nil {
-		panic(err)
-	}
 	err = msgservice.ValidateProtoAnnotations(protoFiles)
 	if err != nil {
 		// Once we switch to using protoreflect-based antehandlers, we might' | git apply
```

Build `wasmd`:

```bash
make install
```

To start a local DA, run:

```bash
curl -sSL https://rollkit.dev/install-local-da.sh | bash -s v0.2.0
```

From inside the `wasmd` directory, run the init script:

```bash
curl -sSL https://rollkit.dev/cosmwasm/init.sh | perl -pe 's/127\.0\.0\.1/0.0.0.0/g' | sh
```

:::info
We modify the listening address from `127.0.0.1` to `0.0.0.0` so that it is accessible from the Hyperlane docker agents later on.
:::

With that, we have kickstarted our `wasmd` network!

## 💻 Deploy the Hyperlane contracts {#deploy-contracts}

Fork the cw-hyperlane repo:

```bash
git clone --depth 1 git@github.com:many-things/cw-hyperlane.git
cd cw-hyperlane
```

#### Create `config.yaml` with our networks setup:

```bash
echo 'networks:
  - id: "localwasmd"
    hrp: "wasm"
    endpoint:
      rpc: "http://localhost:36657"
      rest: "http://localhost:1317"
      grpc: "http://172.17.0.1:9290"
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
              exchange_rate: 2
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
wasmd tx bank send localwasm-key wasm133xh839fjn9wxzg6vhc0370lcem8939zr8uu45 10000000uwasm -y --gas auto --gas-adjustment 1.2 --gas-prices 0.025uwasm
```

:::info
`localwasm-key` is the genesis validator's address. See https://rollkit.dev/cosmwasm/init.sh for more info.
:::

:::tip
To check if the transaction was successful, get the `txhash` field from the response to the `wasmd tx bank send` command above, and run:

```bash
wasmd q tx $TXHASH
```

The transaction was successful if the `code` field is 0 (success).
:::

#### Inside the cw-hyperlane directory, build the Hyperlane contracts:

```bash
yarn install

# Build contracts from local environment
make optimize
# Run compatibility test
make check
```

#### Upload and deploy the contracts on our localwasmd rollup:

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
# Stride has permissioned CosmWasm, meaning only certain addresses can upload contracts.
# The Hyperlane contracts have already been uploaded, so all that's left is to instantiate them.
# This command will initialize the config for stride-testnet-1 with the code IDs of the Hyperlane contracts.
echo '{
  "artifacts": {
    "hpl_mailbox": 362,
    "hpl_validator_announce": 363,
    "hpl_ism_aggregate": 364,
    "hpl_ism_multisig": 365,
    "hpl_ism_pausable": 366,
    "hpl_ism_routing": 367,
    "hpl_igp": 368,
    "hpl_hook_aggregate": 369,
    "hpl_hook_fee": 370,
    "hpl_hook_merkle": 371,
    "hpl_hook_pausable": 372,
    "hpl_hook_routing": 373,
    "hpl_hook_routing_custom": 374,
    "hpl_hook_routing_fallback": 375,
    "hpl_test_mock_hook": 376,
    "hpl_test_mock_ism": 377,
    "hpl_test_mock_msg_receiver": 378,
    "hpl_igp_oracle": 379,
    "hpl_warp_cw20": 380,
    "hpl_warp_native": 381
  },
  "deployments": {}
}' > context/stride-internal-1.json

# This command will output two results.
# - context + deployment    (default path: {cw-hyperlane-root}/context/stride-internal-1.json)
# - Hyperlane agent-config  (default path: {cw-hyperlane-root}/context/stride-internal-1.config.json)
yarn cw-hpl deploy -n stride-internal-1
```

#### Setup the relayer config:

```bash
echo '{
  "db": "/etc/data/db",
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
  "db": "/etc/data/db",
  "checkpointSyncer": {
    "type": "localStorage",
    "path": "/etc/validator/strideinternal1/checkpoint"
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

#### Setup the validator config on the localwasmd rollup side:

```bash
echo '{
  "db": "/etc/data/db",
  "checkpointSyncer": {
    "type": "localStorage",
    "path": "/etc/validator/localwasmd/checkpoint"
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

#### Prepare the validators and relayer configs:

```bash
# Create agent-config.docker.json by merging localwasmd.config.json and stride-internal-1.config.json
jq -s '(.[0] | .chains.localwasmd.grpcUrl = .chains.localwasmd.grpcUrls[0].http) * (.[1] | .chains.strideinternal1.grpcUrl = .chains.strideinternal1.grpcUrls[0].http)' context/{localwasmd,stride-internal-1}.config.json > example/hyperlane/agent-config.docker.json
```

#### Update the docker compose file:

```bash
echo 'services:
  relayer:
    container_name: hpl-relayer
    image: gcr.io/abacus-labs-dev/hyperlane-agent:3bb4d87-20240129-164519
    user: root
    # restart: always
    entrypoint: ["sh", "-c"]
    command:
      - |
        rm -rf /app/config/* && \
        cp "/etc/hyperlane/agent-config.docker.json" "/app/config/agent-config.json" && \
        CONFIG_FILES="/etc/hyperlane/relayer.json" \
          ./relayer
    ports:
      - 9110:9090
    volumes:
      - ./hyperlane:/etc/hyperlane
      - ./relayer:/etc/data
      - ./validator:/etc/validator
    extra_hosts:
      - 'host.docker.internal:host-gateway'

  validator-localwasmd:
    container_name: hpl-validator-localwasmd
    image: gcr.io/abacus-labs-dev/hyperlane-agent:3bb4d87-20240129-164519
    user: root
    # restart: always
    entrypoint: ["sh", "-c"]
    command:
      - |
        rm -rf /app/config/* && \
        cp "/etc/hyperlane/agent-config.docker.json" "/app/config/agent-config.json" && \
        CONFIG_FILES="/etc/hyperlane/validator.localwasmd.json" \
          ./validator
    ports:
      - 9120:9090
    volumes:
      - ./hyperlane:/etc/hyperlane
      - ./validator:/etc/validator
      - ./validator/localwasmd:/etc/data
    extra_hosts:
      - 'host.docker.internal:host-gateway'

  validator-strideinternal1:
    container_name: hpl-validator-strideinternal1
    image: gcr.io/abacus-labs-dev/hyperlane-agent:3bb4d87-20240129-164519
    user: root
    # restart: always
    entrypoint: ["sh", "-c"]
    command:
      - |
        rm -rf /app/config/* && \
        cp "/etc/hyperlane/agent-config.docker.json" "/app/config/agent-config.json" && \
        CONFIG_FILES="/etc/hyperlane/validator.strideinternal1.json" \
          ./validator
    ports:
      - 9121:9090
    volumes:
      - ./hyperlane:/etc/hyperlane
      - ./validator:/etc/validator
      - ./validator/strideinternal1:/etc/data' > example/docker-compose.yml
```

#### Run the relayer and validators:

```bash
# This will launch one relayer and two validators, one on each side
docker compose -f example/docker-compose.yml up
```

## Resources

- [Deploying Hyperlane with Osmosis Testnet](https://github.com/many-things/cw-hyperlane/blob/main/DEPLOYMENT.md#4-setup-validator--relayer-config)
- [Hyperlane docs: Deploy Hyperlane](https://docs.hyperlane.xyz/docs/deploy-hyperlane)
