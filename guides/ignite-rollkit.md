# How to Use Ignite to Create a Rollkit App

This guide will walk you through the process of using Ignite to create a Rollkit app.

<!-- markdownlint-disable MD033 -->
<script setup>
import Callout from '../.vitepress/components/callout.vue'
import constants from '../.vitepress/constants/constants.js'
</script>

## Install Ignite {#install-ignite}

You can read more about Ignite [here](https://docs.ignite.com).

To install Ignite, you can run this command in your terminal:

```bash-vue
curl https://get.ignite.com/cli@{{constants.igniteVersionTag}}! | bash
```

Once Ignite is installed, scaffold a new blockchain with the following command:

```bash
ignite scaffold chain gm --address-prefix gm --minimal --skip-proto
```

This will create the `gm` blockchain. Navigate to the blockchain directory:

```bash
cd gm
```

## Run a local Data Availability (DA) node {#run-local-da-node}

First, set up a local data availability network node:

```bash-vue
cd $HOME && curl -sSL https://rollkit.dev/install-local-da.sh | sh -s {{constants.localDALatestTag}}
```

This script builds and runs a DA node, which will listen on port `7980`.

## Run a local Seuqnecer node {#run-local-sequencer-node}

First, set up a local sequencer node:

```bash-vue
cd $HOME && curl -sSL https://rollkit.dev/install-local-sequencer.sh | sh -s {{constants.goSequencingLatestTag}} gm
```

This script builds and runs a local sequencer node, which will listen on port `50051`.

## Install Ignite App Rollkit {#install-ignite-app-rollkit}

In a new terminal window, you'll now install and run the Ignite App Rollkit.

Run the following command to install the Rollkit App:

```bash-vue
ignite app install github.com/ignite/apps/rollkit@{{constants.rollkitIgniteAppVersion}}
```

This installs the Rollkit application, which will be integrated into your blockchain.

## Add Rollkit Features {#add-rollkit-features}

Enhance your blockchain by adding Rollkit features. Use the following command:

```bash
ignite rollkit add
```

## Initialize Your Blockchain {#initialize-your-blockchain}

Before starting your blockchain, you need to initialize it with Rollkit support. Initialize the blockchain with Local DA as follows:

```bash
ignite rollkit init
```

### Initialize Rollkit CLI Configuration {#initialize-rollkit-cli-configuration}

To initialize the Rollkit CLI configuration, generate the `rollkit.toml` file by running the following command:

```bash
rollkit toml init
```

This will set up the Rollkit configuration file rollkit.toml, allowing you to use the Rollkit CLI for managing and running your blockchain.

## Start Your Rollup {#start-your-blockchain}

Finally, start your rollup (blockchain) using the following command:

```bash
rollkit start --rollkit.aggregator --rollkit.da_address http://localhost:7980
```

Your rollkit app is now up and running.

## Summary

By following these steps, you've successfully installed Ignite, set up Local DA, integrated Rollkit features into your blockchain, and configured the Rollkit CLI.
