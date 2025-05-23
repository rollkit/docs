---
description: Quickly start a node using the Rollkit CLI.
---

<script setup>
import constants from '../.vitepress/constants/constants.js'
</script>

# Quick start guide

Welcome to Rollkit, a sovereign framework! The easiest way to launch your sovereign node is by using the Rollkit CLI.

This tutorial will guide you through the process of building and deploying a simple "gm" (good morning) application using Rollkit.

## ☀️ Introduction

In this tutorial, we will explore how to use Rollkit to create a sovereign application. First, we will install the necessary dependencies. Then, we will install and set up a Rollkit node to work with a local data availability layer. Lastly, we'll look at how to create a custom execution environment and how to deploy a sovereign application using Rollkit.

By the end of this tutorial, you will have a good understanding of how Rollkit works and how to create sovereign applications using Rollkit. You will also have the knowledge and skills needed to customize Rollkit with different execution environments and data availability layers, opening up new possibilities for creating scalable and efficient blockchain applications.

### 📖 The stack

Sovereign applications are made possible through a module that allows Rollkit instances to use a data availability layer. This integration opens up possibilities for developers to create applications with arbitrary execution environments that inherit the data availability layer's guarantees and security guarantees.

The modular design of Rollkit allows for easy integration of new data availability layers, making it possible to deploy sovereign applications.

The goal of Rollkit is to make it easy to build and customize applications, enabling developers to build sovereign applications or customize Rollkit with different execution environments and data availability layers.

## 📦 Install Rollkit (CLI)

To install Rollkit, run the following command in your terminal:

```bash-vue
curl -sSL https://rollkit.dev/install.sh | sh -s {{constants.rollkitLatestTag}}
```

Verify the installation by checking the Rollkit version:

```bash
rollkit version
```

A successful installation will display the version number and its associated git commit hash.

## 🚀 Run your sovereign node

To start a basic sovereign node, execute:

```bash
rollkit start
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

That's it! Your sovereign node is now up and running. It's incredibly simple to start a blockchain (which is essentially what an application is) these days using Rollkit. Explore further and discover how you can build useful applications on Rollkit. Good luck!
