# Using Local DA

<!-- markdownlint-disable MD033 -->
<script setup>
import constants from '../../.vitepress/constants/constants.js'
</script>

## Introduction {#introduction}

This tutorial serves as a comprehensive guide for using the [local-da](https://github.com/rollkit/local-da) with your chain. 

Before proceeding, ensure that you have completed the [quick start](/tutorials/quick-start) or [build a chain](/tutorials/wordle) tutorial, which covers installing the rollkit CLI, building your chain, and running your chain.

## Setting Up a Local DA Network

To set up a local DA network node on your machine, run the following script to install and start the local DA node:

```bash-vue
curl -sSL https://rollkit.dev/install-local-da.sh | bash -s {{constants.localDALatestTag}}
```

This script will build and run the node, which will then listen on port `7980`.

## Configuring your rollup to connect to the local DA network

To connect your rollup to the local DA network, you need to pass the `--rollkit.da_address` flag with the local DA node address.

## Run your rollup

Start your rollup node with the following command, ensuring to include the DA address flag:

::: code-group

```sh [Quick Start]
rollkit start --rollkit.da_address http://localhost:7980
```

```sh [Wordle Chain]
rollkit start \
    --rollkit.aggregator \
    --rollkit.da_address http://localhost:7980 \
    --rollkit.sequencer_rollup_id wordle
```

:::

You should see the following log message indicating that your rollup is connected to the local DA network:

```shell
I[2024-11-15|14:54:19.842] DA server is already running                 module=main address=http://localhost:7980
```

## Summary

By following these steps, you will set up a local DA network node and configure your rollup to post data to it. This setup is useful for testing and development in a controlled environment.
