# Quick Start Guide for Artela EVM++ with Rollkit

<script setup>
import constants from '../.vitepress/constants/constants.js'
</script>

This guide will assist you in quickly setting up and operating an rollup node with [Artela EVM++](https://docs.artela.network/main/Artela-Blockchain/EVM++) execution layer using Rollkit and local-DA.

![evmpp](/evmpp/evmpp.png)

EVM++ is a modular dual-vm execution layer that support dynamic creation of native extension modules for blockchain at runtime. 

EVM++ allowing developers to utilize WasmVM to build native extensions to coprocess with EVM for more customized functionalities. Beyond just dual-VM, these native extensions enable customization at the block level. It enables custom logic to be added throughout the transaction lifecycle with broader runtime context access.

## 📦 Clone the Artela Rollkit Repository

Begin by cloning the Artela Rollkit repository:

```bash
git clone https://github.com/artela-network/artela-rollkit.git
cd artela-rollkit
```

## 🛥️ Run with Docker Compose

Ensure Docker is installed on your system before initiating the Artela rollup node. If not, download and follow the setup instructions [here](https://www.docker.com/products/docker-desktop/).

After installing Docker, execute the following command to start a local development node:

```bash
docker compose up -d
```

This command initiates the Artela rollup node with Rollkit and local-DA. Monitor the logs using this command:

```bash
docker logs artroll -f
```

If you observe the following output, the local development node is functioning properly:

```bash
...
7:09AM INF finalized block block_app_hash=E483920A1E1E7E492E47036300003769420813BB13BB3F25CFAFDB0DF19C144A height=3 module=BlockManager num_txs_res=0 num_val_updates=0
7:09AM INF executed block app_hash=E483920A1E1E7E492E47036300003769420813BB13BB3F25CFAFDB0DF19C144A height=3 module=BlockManager
7:09AM INF indexed block events height=3 module=txindex
7:09AM INF Creating and publishing block height=4 module=BlockManager
...
```

## 🔑 Create testing accounts

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
private key: 0x531183470334c5551c7645f8b74f22b544d1e0c813b9e5b6d79d5416f124fe32
address: 0x682a8598aaaba7ab3e35024d9fbedfee164521be
```

There are four testing accounts available in the local development node for interacting with the EVM chain.

## 🧪 Build on EVM++

Let's learn Artela EVM++ by quickly starting with the Hello World project! The code will show you everything!!

👉 [Quick Start](https://docs.artela.network/develop/get-started/art-dev-intro): deploy your first smart contract on Artela EVM.

👉 [Quick Start](https://docs.artela.network/develop/get-started/dev-aspect): try your first [Aspect](https://docs.artela.network/develop/core-concepts/aspect-programming) on Artela!

Now, we believe that you

* have a basic sense of Artela technology,
* have installed and tried Artela dev tools,
* know how Aspect works, and know how Aspect makes dApp different and great!
* You might even already have lots of exciting ideas about building on Artela!

### 📖 Learn more if need
Let’s delve into Aspect and your idea!

Learn more detailed concepts of Aspect, and you will know what it can do for your idea and what it can’t.

If you are very interested in the deep Aspects, you should not miss those concepts.

* [Aspect Runtime](https://docs.artela.network/develop/core-concepts/aspect-runtime)
* [Aspect Lifecycle](https://docs.artela.network/develop/core-concepts/lifecycle)
* [Join Point](https://docs.artela.network/develop/core-concepts/join-point)
* [Aspect Tool](https://docs.artela.network/develop/reference/aspect-tool/overview)
* [Aspect Libs](https://docs.artela.network/develop/reference/aspect-lib/overview)

### 💥 Build with examples
There are many examples of Aspect projects.

Checkout, build, and modify! When you try to build a complex Aspect, this path will save you from many basic problems in using the basic API.

Examples that show how to use the basic library

* Example 1: [Against Reentrancy Attacks with Aspect](https://github.com/artela-network/aspect-example/blob/main/reentrance/README.md)
* Example 2: [Aspect operation call case](https://github.com/artela-network/aspect-example/blob/main/operation/README.md)
* Example 3: [Using Aspect to mirror a transaction via jit-call](https://github.com/artela-network/aspect-example/blob/main/storage_mirror/README.md)


Real use cases that show how to apply to specific dApps

* [Session key Aspect](https://github.com/artela-network/session-key-aspect): use Aspect to extend EoA with session keys and improve
* [JIT-gaming Aspect](https://github.com/cpppppp7/jit-gaming): use Aspect to add automatic on-chain NPC for a fully on-chain game.


## 🛑 Stopping the Node

To cease operations and shutdown the Artela rollup node, use:

```bash
docker compose down
```

This command halts all running containers and clears the environment.

## 🎉 Conclusion

Congratulations! You've successfully set up and operated an Artela EVM++ rollup with Rollkit and local-DA, allowing you to test Artela's EVM++ capabilities integrated with Rollkit.
