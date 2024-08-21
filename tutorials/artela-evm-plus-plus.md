# Quick Start Guide for Artela EVM++ with Rollkit

<script setup>
import constants from '../.vitepress/constants/constants.js'
</script>

This guide will assist you in quickly setting up and operating an Artela rollup node using Rollkit and local-DA.

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

## 🧪 Smart Contract Deployment and Interaction

To deploy and interact with smart contracts on the EVM, utilize familiar tools. Explore the [Contract Interaction Tutorial](/tutorials/evm-contract-interaction) for hands-on experience. For additional insights into EVM++ extension development, refer to the [Aspect Development Tutorial](https://docs.artela.network/develop/get-started/dev-aspect).

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

## 🛑 Stopping the Node

To cease operations and shutdown the Artela rollup node, use:

```bash
docker compose down
```

This command halts all running containers and clears the environment.

## 🎉 Conclusion

Congratulations! You've successfully set up and operated an Artela rollup node with Rollkit and local-DA, allowing you to test Artela's EVM++ capabilities integrated with Rollkit.
