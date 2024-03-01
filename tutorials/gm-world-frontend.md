# GM world frontend tutorial

In this tutorial, we'll learn how to use [Cosmology](https://cosmology.tech/) to
create a frontend for our [GM world](/tutorials/gm-world) rollup.

Cosmology enables developers to build web3 apps in the Interchain Ecosystem.
With Cosmology, it's simple to begin building apps that communicate with
Cosmos SDK and CosmWasm chains.

We'll be using `create-cosmos-app` in this tutorial to scaffold
a frontend and add the chain information for our rollup.

In the end, you'll have something that looks like this
[demo](https://rollkit-frontend.vercel.app)
([repo](https://github.com/jcstein/rollkit-frontend)).

## Getting started

In order to complete this tutorial you will need to have completed
the [GM world tutorial](/tutorials/gm-world). This requires a running rollup
on your local machine.

## Setting up the frontend

Now that you have your rollup running, you are ready to scaffold
the frontend! In your terminal, first install `create-cosmos-app`:

```bash
npm install -g create-cosmos-app
```

Now scaffold an app:

```bash
create-cosmos-app
```

In this tutorial, we're using the following setting and your output
will look similar to this if everything is successful:

```bash
? [name] Enter your new app name gm-world
Cloning into 'gm-world'...
? [template] which template connect-multi-chain
yarn install v1.22.19
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
Done in 42.23s.


                 |              _   _
     ===         |.===.        '\-//`
    (o o)        {}o o{}        (o o)
ooO--(_)--Ooo-ooO--(_)--Ooo-ooO--(_)--Ooo-

✨ Have fun! Now you can start on your project ⚛️

Now, run this command:

cd ./gm-world && yarn dev
```

Follow the instructions at the end of the output to start your app:

```bash
cd ./gm-world && yarn dev
```

## Adding your GM portal chain to the config

First, we'll need to make some changes with the default config
to set up the config for `gmrollup`!

In the `config` directory, create a new file called `chain.ts`. This will
be your config for your GM rollup.

In that file, put the following:

```tsx
export default {
    "$schema": "../../chain.schema.json",
    "chain_name": "gmrollup",
    "chain_id": "gm",
    "pretty_name": "my gm rollup",
    "status": "live",
    "network_type": "testnet",
    "bech32_prefix": "gm",
    "daemon_name": "gmd",
    "node_home": "$HOME/.gm",
    "key_algos": [
      "secp256k1"
    ],
    "slip44": 118,
    "fees": {
      "fee_tokens": [
        {
          "denom": "ustake",
          "fixed_min_gas_price": 0
        }
      ]
    },
    "apis": {
      "rpc": [
        {
          "address": "http://localhost:26657",
          "provider": "local-network"
        }
      ],
      "rest": [
        {
          "address": "http://localhost:1317",
          "provider": "local-network"
        }
      ]
    },
    "beta": true,
  }
  ```

Create a new file in `config` called `assetlist.ts` and add the following:

```tsx
export default {
    "$schema": "../../assetlist.schema.json",
    "chain_name": "gmrollup",
    "assets": [
      {
        "description": "",
        "denom_units": [
          {
            "denom": "ustake",
            "exponent": 0
          },
          {
            "denom": "stake",
            "exponent": 6
          }
        ],
        "base": "stake",
        "name": "GM rollup",
        "display": "stake",
        "symbol": "STAKE",
        "logo_URIs": {
          "svg": "https://raw.githubusercontent.com/jcstein/gm-portal/b030ce3fe548d188fbacb6b932d7e51dc7afd65e/frontend/public/gm.svg"
        }
      }
    ]
  }
```

In `config/defaults.ts` add your rollup as the default chain:

```tsx
export const CHAIN_NAME = "gmrollup";
```

In `_app.tsx` you can now import `assetlist` and `chain` with your
new GM config!

```tsx
# other imports
import localchain from "../config/chain"
import localassets from "../config/assetlist"

# rest of code
```

Then, modify your `ChainProvider`:

```tsx
 <ChainProvider
    chains={[...chains, localchain]} // [!code ++]
    assetLists={[...assets, localassets]} // [!code ++]
    wallets={wallets}
    walletConnectOptions={{
      signClient: {
        projectId: "a8510432ebb71e6948cfd6cde54b70f7",
        relayUrl: "wss://relay.walletconnect.org",
        metadata: {
          name: "CosmosKit Template",
          description: "CosmosKit dapp template",
          url: "https://docs.cosmology.zone/cosmos-kit/",
          icons: [],
        },
      },
    }}
    // @ts-ignore
    signerOptions={signerOptions}
  >
```

Congratulations! You now have a frontend for your rollup.
What features do you want to add now?

![cca.png](/gm/cca.png)

<!-- ## TODO

* edit chain denom/token
* show how to connect wallet and display balance in Keplr
* any other suggestions -->
