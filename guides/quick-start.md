---
description: Quickly start a rollup node using the Testapp CLI.
---

<script setup>
import constants from '../.vitepress/constants/constants.js'
</script>

# Quick start guide

Welcome to Rollkit, a sovereign rollup framework! The easiest way to launch your sovereign rollup node is by using the Testapp CLI.

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
rollkit version:  v0.14.1
rollkit git sha:  888def92
```

## 🗂️ Initialize a sovereign rollup node

To initialize a sovereign rollup node, execute the following command:

```bash
testapp init --rollkit.node.aggregator --rollkit.signer.passphrase verysecretpass
```

## 🚀 Run your sovereign rollup node

To start a basic sovereign rollup node, execute:

```bash
testapp start --rollkit.signer.passphrase verysecretpass
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

That's it! Your sovereign rollup node is now up and running. It's incredibly simple to start a blockchain (which is essentially what a rollup is) these days using Rollkit. Explore further and discover how you can build useful applications on Rollkit. Good luck!
