# How to Turn Your CometBFT App into a Rollkit App

This guide will walk you through the process of turning your existing CometBFT app into a Rollkit app. By integrating Rollkit into your CometBFT-based blockchain, you can leverage enhanced modularity and data availability features.

<!-- markdownlint-disable MD033 -->
<script setup>
import Callout from '../.vitepress/components/callout.vue'
import constants from '../.vitepress/constants/constants.js'
</script>

This guide assumes you have a CometBFT app set up and [Ignite CLI](https://docs.ignite.com) installed.

## Install Rollkit {#install-rollkit}

You need to install Rollkit in your CometBFT app. Open a terminal in the directory where your app is located and run the following command:

```bash-vue
ignite app install github.com/ignite/apps/rollkit@{{constants.rollkitIgniteAppVersion}}
```

## Add Rollkit Features to Your CometBFT App {#add-rollkit-features}

Now that Rollkit is installed, you can add Rollkit features to your existing blockchain app. Run the following command to integrate Rollkit:

```bash
ignite rollkit add
```

## Initialize Rollkit {#initialize-rollkit}

To prepare your app for Rollkit, you'll need to initialize it.

Run the following command to initialize Rollkit:

```bash
ignite rollkit init
```

## Initialize Rollkit CLI Configuration {#initialize-rollkit-cli-configuration}

Next, you'll need to initialize the Rollkit CLI configuration by generating the `rollkit.toml` file. This file is crucial for Rollkit to understand the structure of your rollup.

To create the `rollkit.toml` configuration, use this command:

```bash
rollkit toml init
```

This command sets up the `rollkit.toml` file, where you can further customize configuration parameters as needed.

## Start Your Rollkit App {#start-rollkit-app}

Once everything is configured, you can start your Rollkit-enabled CometBFT app or (simply rollkit app). Use the following command to start your blockchain:

```bash
rollkit start --rollkit.aggregator <insert your flags>
```

## Summary

By following this guide, you've successfully converted your CometBFT app into a Rollkit app.

To learn more about how to config your DA, Sequencing, and Execution, please check out those tutorial sections.
