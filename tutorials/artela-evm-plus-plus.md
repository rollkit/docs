# Quick Start Guide for Artela EVM++ with Rollkit

<script setup>
import constants from '../.vitepress/constants/constants.js'
</script>

This guide will assist you to quickly set up a rollup node with [Artela EVM++](https://docs.artela.network/main/Artela-Blockchain/EVM++) execution layer using Rollkit and local-DA.

![artela-evm-rollkit](/artela-evm-rollkit/artela-evm-rollkit.png)

EVM++ is a modular dual-VM execution layer that supports the dynamic creation of native extension modules for blockchain at runtime. It enables developers to leverage WasmVM to build native extensions that co-process with EVM, offering enhanced customization capabilities. More than just a dual-VM setup, these native extensions facilitate blockchain-level customization. They allow for the integration of custom logic throughout the transaction lifecycle, providing access to an expanded runtime context.

## 📦 Clone the Artela Rollkit Repository

Start by cloning the Artela Rollkit repository:

```bash
git clone https://github.com/artela-network/artela-rollkit.git
cd artela-rollkit
```

## 🛥️ Run with Docker Compose

Ensure Docker is installed on your system before setting up the Artela rollup node. If not already installed, download and follow the setup instructions available [here](https://www.docker.com/products/docker-desktop/).

:::tip
Make sure you meet these [prerequisites](https://docs.docker.com/engine/network/tutorials/host/#prerequisites) of enabling host network mode in Docker.
:::

After installing Docker, run the following command to start a local development node:

```bash
docker compose up -d
```

This command launches the Artela rollup node with Rollkit and local-DA. To monitor the logs, use this command:

```bash
docker logs artroll -f
```

If you observe the following output, the local development node is running properly:

```bash
...
7:09AM INF finalized block block_app_hash=E483920A1E1E7E492E47036300003769420813BB13BB3F25CFAFDB0DF19C144A height=3 module=BlockManager num_txs_res=0 num_val_updates=0
7:09AM INF executed block app_hash=E483920A1E1E7E492E47036300003769420813BB13BB3F25CFAFDB0DF19C144A height=3 module=BlockManager
7:09AM INF indexed block events height=3 module=txindex
7:09AM INF Creating and publishing block height=4 module=BlockManager
...
```

## 🔑 Get prefunded test accounts

Access testing accounts by entering the `artroll` Docker container:

```bash
docker exec -ti artroll /bin/bash
```

Retrieve the address and private key of testing accounts using:

```bash
# 👇 Alternatively, you can use myKey2.info, myKey3.info, myKey4.info
./entrypoint keyinfo --file ~/.artroll/keyring-test/mykey.info --passwd test
```

This will display the testing private key and its address:

```bash
private key: { Plain Private Key in Hex Format }
address: { Address Associated with the Private Key }
```

There are four testing accounts available in the local development node for interacting with the EVM chain.

## ⚙️ Configuring the Node

You can modify runtime parameters of the Artela development node by adjusting its configuration files. Follow the steps below to make these changes.

To configure the development node, first access the Docker container by running the following command:

```bash
docker exec -it artroll /bin/bash
```

Inside the container, you will need to modify the following configuration files:

- /root/.artroll/config/app.toml
- /root/.artroll/config/config.toml

After making the necessary changes, return to the Docker host and restart the container to apply the new configuration:

```bash
docker compose restart artroll
```

## 🧪 Build on EVM++

Let’s dive into Artela EVM++ by kicking off with the Hello World project, the following code will guide you through the essentials:

👉 [Contract interaction tutorial](/tutorials/evm-contract-interaction): Get hands-on experience with deploying and interacting with smart contracts on the Artela rollup node.

:::tip
When you are following the Contract interaction tutorial, you need to make the following replacements:
1. Use https://github.com/artela-network/gm-portal.git instead of the original `gm-portal` repo.
2. Use the private key you obtained from the previous step in this tutorial instead of the one used in the Contract interaction tutorial.
3. The contract address should be `0x9fcEbD70654D360b41ccD123dADAAad6ce13C788` instead of the one starts with `0x18D...`.
:::

👉 [Quick Start for Aspect on EVM++](https://docs.artela.network/develop/get-started/dev-aspect): Try your first [Aspect](https://docs.artela.network/develop/core-concepts/aspect-programming) with Artela rollup node.

:::tip
Please note that when you are following the Aspect on EVM++ tutorial, you need to make the following replacements:
1. Replace `npm install -g @artela/aspect-tool` with `npm install -g @artela-next/aspect-tool` 
2. Replace the Artela Testnet node URL in `project.config.json` with `http://localhost:8545` to connect to your local rollup node.
3. Use the private key you obtained from the previous step in this tutorial instead of creating a new account.
:::

By now, we assume that you:

- Have a basic understanding of Artela technology.
- Have installed and played with Artela development tools.
- Understand how Aspect functions and its impact on making dApps distinct and superior.
- May already have numerous innovative ideas for building on Artela.

### 📖 More to know

If you want to gain a deeper understanding of Aspect’s capabilities and limitations to fully grasp how it can enhance or constrain your project, make sure not to overlook these essential concepts:

- [Aspect Runtime](https://docs.artela.network/develop/core-concepts/aspect-runtime)
- [Aspect Lifecycle](https://docs.artela.network/develop/core-concepts/lifecycle)
- [Join Point](https://docs.artela.network/develop/core-concepts/join-point)
- [Aspect Tool](https://docs.artela.network/develop/reference/aspect-tool/overview)
- [Aspect Libs](https://docs.artela.network/develop/reference/aspect-lib/overview)

### 💥 Build with examples

Our community has built numbers of projects with Aspect, you can refer to these projects and modify them to learn how to use Aspect more effectively.

Simple examples that use the basic functionalities of Aspect:

- Example 1: [Aspect Reentrancy Guard](https://github.com/artela-network/example/blob/rollkit/curve_reentrance/README.md)
- Example 2: [Black List Aspect](https://github.com/artela-network/blacklist-aspect/tree/rollkit)
- Example 3: [Throttler Aspect](https://github.com/artela-network/throttler-aspect/tree/rollkit)

Real-world use cases that show how to build more complex projects with Aspect:

- [Session key Aspect](https://github.com/artela-network/session-key-aspect/tree/rollkit): use Aspect to extend EoA with session keys and improve
- [JIT-gaming Aspect](https://github.com/artela-network/jit-gaming/tree/rollkit): use Aspect to add automatic on-chain NPC for a fully on-chain game.


## 🛑 Stopping the Node

To cease operations and shutdown the Artela rollup node, use:

```bash
docker compose down
```

This command halts all running containers and clears the environment.

## 🎉 Conclusion

Congratulations! You have successfully learnt some basic knowledge of EVM++ and have set up an Artela EVM++ rollup using Rollkit and local-DA. This setup enables you to test the integrated capabilities of Artela’s EVM++ with Rollkit.
