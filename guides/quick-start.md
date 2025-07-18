---
description: Quickly start a chain node using the Testapp CLI.
---

<script setup>
import constants from '../.vitepress/constants/constants.js'
</script>

# Quick start guide

Welcome to Rollkit, a sovereign chain framework! The easiest way to launch your sovereign chain node is by using the Testapp CLI.

## 📦 Install Testapp (CLI)

To install Rollkit, run the following command in your terminal:

```bash-vue
curl -sSL https://rollkit.dev/install.sh | sh -s {{constants.rollkitLatestTag}}
```

Verify the installation by checking the Rollkit version:

```bash
testapp version
```

A successful installation will display the version number and its associated git commit hash.

```bash
rollkit version:  execution/evm/v1.0.0-beta.1
rollkit git sha:  cd1970de
```

## 🗂️ Initialize a sovereign chain node

To initialize a sovereign chain node, execute the following command:

```bash
testapp init --rollkit.node.aggregator --rollkit.signer.passphrase secret
```

## 🚀 Run your sovereign chain node

Now that we have our testapp generated and installed, we can launch our chain along with the local DA by running the following command:

First lets start the local DA network:

```bash
curl -sSL https://rollkit.dev/install-local-da.sh | bash -s {{constants.rollkitLatestTag}}
```

You should see logs like:

```bash
4:58PM INF NewLocalDA: initialized LocalDA module=local-da
4:58PM INF Listening on host=localhost maxBlobSize=1974272 module=da port=7980
4:58PM INF server started listening on=localhost:7980 module=da
```

To start a basic sovereign chain node, execute:

```bash
testapp start --rollkit.signer.passphrase secret
```

Upon execution, the CLI will output log entries that provide insights into the node's initialization and operation:

```bash
I[2024-05-01|09:58:46.001] Found private validator                      module=main keyFile=/root/.rollkit/config/priv_validator_key.json stateFile=/root/.rollkit/data/priv_validator_state.json
I[2024-05-01|09:58:46.002] Found node key                               module=main path=/root/.rollkit/config/node_key.json
I[2024-05-01|09:58:46.002] Found genesis file                           module=main path=/root/.rollkit/config/genesis.json
...
I[2024-05-01|09:58:46.080] Started node                                 module=main
I[2024-05-01|09:58:46.081] Creating and publishing block                module=BlockManager height=223
I[2024-05-01|09:58:46.082] Finalized block                              module=BlockManager height=223 num_txs_res=0 num_val_updates=0 block_app_hash=
```

## 🎉 Conclusion

That's it! Your sovereign chain node is now up and running. It's incredibly simple to start a blockchain (which is essentially what a chain is) these days using Rollkit. Explore further and discover how you can build useful applications on Rollkit. Good luck!
