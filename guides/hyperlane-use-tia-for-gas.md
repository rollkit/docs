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

## 📝 In short, deploy a CosmWasm rollup {#deploy-rollup}

This is a gist of the [CosmWasm rollup](../tutorials/cosmwasm.md) guide.

```bash
git clone --branch v0.50.0 --depth 1 https://github.com/CosmWasm/wasmd.git
cd wasmd
```

Add token factory to app.go:

```bash
echo 'diff --git a/app/app.go b/app/app.go
index 44934ea..8e8c829 100644
--- a/app/app.go
+++ b/app/app.go
@@ -10,6 +10,9 @@ import (
 	"strings"
 	"sync"
 
+	"github.com/Stride-Labs/tokenfactory/tokenfactory"
+	tokenfactorykeeper "github.com/Stride-Labs/tokenfactory/tokenfactory/keeper"
+	tokenfactorytypes "github.com/Stride-Labs/tokenfactory/tokenfactory/types"
 	abci "github.com/cometbft/cometbft/abci/types"
 	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
 	dbm "github.com/cosmos/cosmos-db"
@@ -176,10 +179,11 @@ var maccPerms = map[string][]string{
 	govtypes.ModuleName:            {authtypes.Burner},
 	nft.ModuleName:                 nil,
 	// non sdk modules
-	ibctransfertypes.ModuleName: {authtypes.Minter, authtypes.Burner},
-	ibcfeetypes.ModuleName:      nil,
-	icatypes.ModuleName:         nil,
-	wasmtypes.ModuleName:        {authtypes.Burner},
+	ibctransfertypes.ModuleName:  {authtypes.Minter, authtypes.Burner},
+	ibcfeetypes.ModuleName:       nil,
+	icatypes.ModuleName:          nil,
+	wasmtypes.ModuleName:         {authtypes.Burner},
+	tokenfactorytypes.ModuleName: {authtypes.Minter, authtypes.Burner},
 }
 
 var (
@@ -226,6 +230,7 @@ type WasmApp struct {
 	ICAHostKeeper       icahostkeeper.Keeper
 	TransferKeeper      ibctransferkeeper.Keeper
 	WasmKeeper          wasmkeeper.Keeper
+	TokenFactoryKeeper  tokenfactorykeeper.Keeper
 
 	ScopedIBCKeeper           capabilitykeeper.ScopedKeeper
 	ScopedICAHostKeeper       capabilitykeeper.ScopedKeeper
@@ -326,6 +331,7 @@ func NewWasmApp(
 		capabilitytypes.StoreKey, ibcexported.StoreKey, ibctransfertypes.StoreKey, ibcfeetypes.StoreKey,
 		wasmtypes.StoreKey, icahosttypes.StoreKey,
 		icacontrollertypes.StoreKey,
+		tokenfactorytypes.StoreKey,
 	)
 
 	tkeys := storetypes.NewTransientStoreKeys(paramstypes.TStoreKey)
@@ -563,6 +569,16 @@ func NewWasmApp(
 		app.BankKeeper,
 	)
 
+	// Token factory keeper
+	app.TokenFactoryKeeper = tokenfactorykeeper.NewKeeper(
+		keys[tokenfactorytypes.StoreKey],
+		app.GetSubspace(tokenfactorytypes.ModuleName),
+		maccPerms,
+		app.AccountKeeper,
+		app.BankKeeper,
+		app.DistrKeeper,
+	)
+
 	// create evidence keeper with router
 	evidenceKeeper := evidencekeeper.NewKeeper(
 		appCodec,
@@ -725,6 +741,7 @@ func NewWasmApp(
 		ibcfee.NewAppModule(app.IBCFeeKeeper),
 		ica.NewAppModule(&app.ICAControllerKeeper, &app.ICAHostKeeper),
 		ibctm.AppModule{},
+		tokenfactory.NewAppModule(app.TokenFactoryKeeper, app.AccountKeeper, app.BankKeeper),
 		// sdk
 		crisis.NewAppModule(app.CrisisKeeper, skipGenesisInvariants, app.GetSubspace(crisistypes.ModuleName)), // always be last to make sure that it checks for all invariants and not only part of them
 	)
@@ -770,6 +787,7 @@ func NewWasmApp(
 		icatypes.ModuleName,
 		ibcfeetypes.ModuleName,
 		wasmtypes.ModuleName,
+		tokenfactorytypes.ModuleName,
 	)
 
 	app.ModuleManager.SetOrderEndBlockers(
@@ -786,6 +804,7 @@ func NewWasmApp(
 		icatypes.ModuleName,
 		ibcfeetypes.ModuleName,
 		wasmtypes.ModuleName,
+		tokenfactorytypes.ModuleName,
 	)
 
 	// NOTE: The genutils module must occur after staking so that pools are
@@ -811,6 +830,7 @@ func NewWasmApp(
 		ibcfeetypes.ModuleName,
 		// wasm after ibc transfer
 		wasmtypes.ModuleName,
+		tokenfactorytypes.ModuleName,
 	}
 	app.ModuleManager.SetOrderInitGenesis(genesisModuleOrder...)
 	app.ModuleManager.SetOrderExportGenesis(genesisModuleOrder...)
@@ -899,9 +919,6 @@ func NewWasmApp(
 	// At startup, after all modules have been registered, check that all proto
 	// annotations are correct.
 	protoFiles, err := proto.MergedRegistry()
-	if err != nil {
-		panic(err)
-	}
 	err = msgservice.ValidateProtoAnnotations(protoFiles)
 	if err != nil {
 		// Once we switch to using protoreflect-based antehandlers, we might
@@ -1209,5 +1226,6 @@ func initParamsKeeper(appCodec codec.BinaryCodec, legacyAmino *codec.LegacyAmino
 	paramsKeeper.Subspace(icahosttypes.SubModuleName).WithKeyTable(icahosttypes.ParamKeyTable())
 
 	paramsKeeper.Subspace(wasmtypes.ModuleName)
+	paramsKeeper.Subspace(tokenfactorytypes.ModuleName)
 	return paramsKeeper
 }' | git apply
```

Update packages to accommodate tokenfactory:
```bash
go mod edit -replace github.com/cosmos/cosmos-sdk=github.com/rollkit/cosmos-sdk@v0.50.7-rollkit-v0.13.6-no-fraud-proofs.0.20240730125236-04ca9ba69219
go mod edit -replace cosmossdk.io/core=cosmossdk.io/core@v0.11.0
go mod edit -replace github.com/cosmos/ibc-go/v8=github.com/cosmos/ibc-go/v8@v8.0.0
go get -v github.com/Stride-Labs/tokenfactory@a301020c313d6bd8b45e474ca242922bdd133f6b
go mod tidy -compat=1.17
go mod download
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

## 💻 Deploy the Hyperlane {#deploy-hyperlane}

Fork the cw-hyperlane repo:

```bash
git clone --depth 1 git@github.com:many-things/cw-hyperlane.git
cd cw-hyperlane
```

#### Create `config.yaml` with our networks setup:

```bash
echo 'networks:
  - id: 'localwasm'
    hrp: 'wasm'
    endpoint:
      rpc: 'http://127.0.0.1:36657'
      rest: 'http://127.0.0.1:1317'
      grpc: 'http://127.0.0.1:9290'
    gas:
      price: '0.025'
      denom: 'uwasm'
    domain: 963
    signer: 'join always addict position jungle jeans bus govern crack huge photo purse famous live velvet virtual weekend hire cricket media dignity wait load mercy' # wasm133xh839fjn9wxzg6vhc0370lcem8939zr8uu45
  - id: 'stride-internal-1'
    hrp: 'stride'
    endpoint:
      rpc: 'https://stride-testnet-rpc.polkachu.com'
      rest: 'https://stride-testnet-api.polkachu.com'
      grpc: 'http://stride-testnet-grpc.polkachu.com:12290'
    gas:
      price: '0.01'
      denom: 'ustrd'
    domain: 1651
    signer: 'join always addict position jungle jeans bus govern crack huge photo purse famous live velvet virtual weekend hire cricket media dignity wait load mercy' # stride133xh839fjn9wxzg6vhc0370lcem8939z2sd4gn

# wasm133xh839fjn9wxzg6vhc0370lcem8939zr8uu45
# stride133xh839fjn9wxzg6vhc0370lcem8939z2sd4gn
signer: 'join always addict position jungle jeans bus govern crack huge photo purse famous live velvet virtual weekend hire cricket media dignity wait load mercy'

deploy:
  ism:
    type: multisig
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
            amount: 1
' > config.yaml
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

#### Fund the cw-hyperlane signer in our localwasm rollup:

```bash
wasmd tx bank send localwasm-key wasm133xh839fjn9wxzg6vhc0370lcem8939zr8uu45 10000000uwasm -y --gas auto --gas-adjustment 1.5 --gas-prices 0.025uwasm
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

#### Inside the cw-hyperlane directory, install the hyperlane cw-cli:

```bash
yarn install
```

#### Upload and deploy the contracts on our localwasm rollup:

```bash
# This command will make one file.
# - context with artifacts (default path: {cw-hyperlane-root}/context/localwasm.json)
yarn cw-hpl upload remote v0.0.6-rc8 -n localwasm

# This command will output two results.
# - context + deployment    (default path: {cw-hyperlane-root}/context/localwasm.json)
# - Hyperlane agent-config  (default path: {cw-hyperlane-root}/context/localwasm.config.json)
yarn cw-hpl deploy -n localwasm
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
  "relayChains": "localwasm,strideinternal1",
  "allowLocalCheckpointSyncers": "true",
  "gasPaymentEnforcement": [{ "type": "none" }],
  "whitelist": [
    {
      "origindomain": [963],
      "destinationDomain": [1651]
    },
    {
      "origindomain": [1651],
      "destinationDomain": [963]
    }
  ],
  "chains": {
    "localwasm": {
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

#### Setup the validator config on the localwasm rollup side:

```bash
echo '{
  "db": "/etc/data/db",
  "checkpointSyncer": {
    "type": "localStorage",
    "path": "/etc/validator/localwasm/checkpoint"
  },
  "originChainName": "localwasm",
  "validator": {
    "type": "hexKey",
    "key": "0xf0517040b5669e2d93ffac3a3616187b14a19ad7a0657657e0f655d5eced9e31"
  },
  "chains": {
    "localwasm": {
      "signer": {
        "type": "cosmosKey",
        "key": "0xf0517040b5669e2d93ffac3a3616187b14a19ad7a0657657e0f655d5eced9e31",
        "prefix": "wasm"
      }
    }
  }
}' > example/hyperlane/validator.localwasm.json
```

#### Prepare the validators and relayer config:

```bash
# Create agent-config.docker.json by merging localwasm.config.json and stride-internal-1.config.json
# We also have to put quotes around the gasPrice amount to be compliant
# with the agent version
jq -s '.[0] * .[1]' context/{localwasm,stride-internal-1}.config.json | \
  jq '.chains |= with_entries(.value.gasPrice.amount |= tostring)' > \
  example/hyperlane/agent-config.docker.json

# Replace `localhost` with `172.17.0.1` in agent-config.docker.json,
# to allow the relayer and validators to connect to localwasm which is running on the docker host machine.
perl -i -pe 's/localhost/172.17.0.1/' example/hyperlane/agent-config.docker.json
```

#### Update the docker compose file:

```bash
echo 'services:
  relayer:
    container_name: hpl-relayer
    image: gcr.io/abacus-labs-dev/hyperlane-agent:8a66544-20240530-111322
    platform: linux/amd64
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

  validator-localwasm:
    container_name: hpl-validator-localwasm
    image: gcr.io/abacus-labs-dev/hyperlane-agent:8a66544-20240530-111322
    platform: linux/amd64
    user: root
    # restart: always
    entrypoint: ["sh", "-c"]
    command:
      - |
        rm -rf /app/config/* && \
        cp "/etc/hyperlane/agent-config.docker.json" "/app/config/agent-config.json" && \
        CONFIG_FILES="/etc/hyperlane/validator.localwasm.json" \
          ./validator
    ports:
      - 9120:9090
    volumes:
      - ./hyperlane:/etc/hyperlane
      - ./validator:/etc/validator
      - ./validator/localwasm:/etc/data
    extra_hosts:
      - 'host.docker.internal:host-gateway'

  validator-strideinternal1:
    container_name: hpl-validator-strideinternal1
    image: gcr.io/abacus-labs-dev/hyperlane-agent:8a66544-20240530-111322
    platform: linux/amd64
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
docker compose -f example/docker-compose.yml up
```

#### Deploy warp route on localwasm

```bash
yarn cw-hpl warp deploy -n localwasm
```

#### Deploy warp contract with TIA as collateral on Stride:

```bash
echo '{
  "type": "native",
  "mode": "collateral",
  "id": "TIA.stride-localwasm",
  "owner": "<signer>",
  "config": {
    "collateral": {
      "denom": "ibc/1A7653323C1A9E267FF7BEBF40B3EEA8065E8F069F47F2493ABC3E0B621BF793"
    }
  }
}' > example/warp/utia-stride.json

yarn cw-hpl warp create ./example/warp/utia-stride.json -n stride-internal-1
```

The output shoule look like:

```
[DEBUG] [contract] deploying hpl_warp_native
[ INFO] [contract] deployed hpl_warp_native at stride1wl200l7hhpmkvcrr03dllun5ehkklh83wypgrfftwxdd6sw22lrqu5f40r
```

#### Deploy warp contract on localwasm:

```bash
echo '{
  "type": "native",
  "mode": "bridged",
  "id": "TIA.stride-localwasm",
  "owner": "<signer>",
  "config": {
    "bridged": {
      "denom": "utia",
      "metadata": {
        "description": "TIA via Stride",
        "denom_units": [],
        "base": "utia",
        "display": "utia",
        "name": "utia",
        "symbol": "utia"
      }
    }
  }
}' > example/warp/utia-localwasm.json

yarn cw-hpl warp create ./example/warp/utia-localwasm.json -n localwasm
```

::tip
`code_id` is taken from `cw-hyperlane/context/localwasm.json`. This might be different on your setup, but for the porpuses of this guide it's 19 because we uploaded the contracts to localwasm right afer genesis.
::

The output shoule look like:

```
[DEBUG] [contract] deploying hpl_warp_native
[ INFO] [contract] deployed hpl_warp_native at stride1wl200l7hhpmkvcrr03dllun5ehkklh83wypgrfftwxdd6sw22lrqu5f40r
```

## Resources

- [Deploying Hyperlane with Osmosis Testnet](https://github.com/many-things/cw-hyperlane/blob/main/DEPLOYMENT.md)
- [Hyperlane docs: Deploy Hyperlane](https://docs.hyperlane.xyz/docs/deploy-hyperlane)
