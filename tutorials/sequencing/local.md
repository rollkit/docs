# Local Sequencer

<!-- markdownlint-disable MD033 -->
<script setup>
import constants from '../../.vitepress/constants/constants.js'
</script>

## Introduction {#introduction}

This tutorial serves as a comprehensive guide for using the [local-sequencer](https://github.com/rollkit/go-sequencing) with your chain. 

Before proceeding, ensure that you have completed the [quick start](/tutorials/quick-start) or [build a chain](/tutorials/wordle) tutorial, which covers installing the rollkit CLI, building your chain, and running your chain.

## Setting Up a Local Local Sequencer

To set up a local sequencer on your machine, run the following script to install and start the local sequencer:

::: code-group

```bash-vue [Quick Start]
curl -sSL https://rollkit.dev/install-local-sequencer.sh | bash -s {{constants.goSequencingLatestTag}} my-rollup
```

```bash-vue [Build a Chain]
curl -sSL https://rollkit.dev/install-local-sequencer.sh | bash -s {{constants.goSequencingLatestTag}} wordle
```

:::

This script will build and run the sequencer, which will then listen on port `50051` with the `rollup-id` of your chain.

## Configuring your chain to connect to the local sequencer

To connect your chain to the local sequencer, you need to pass the `--rollkit.sequencer_address` flag with the centralized sequencer address and the `--rollkit.sequencer_rollup_id` to ensure your rollup id matches what the sequencer is expecting.

## Run your chain

Start your chain with the following command, ensuring to include the sequencer flag:

::: code-group

```sh [Quick Start]
rollkit start \
    --rollkit.sequencer_address localhost:50051 \
    --rollkit.sequencer_rollup_id my-rollup
```

```sh [Wordle Chain]
rollkit start \
    --rollkit.aggregator \
    --rollkit.sequencer_address localhost:50051 \
    --rollkit.sequencer_rollup_id wordle
```

:::

You should see the following log messages indicating that your chain is connected to the local sequencer:

```sh
I[2024-11-15|15:22:33.636] sequencer already running                 module=main address=localhost:50051
I[2024-11-15|15:22:33.636] make sure your rollupID matches your sequencer module=main rollupID=my-rollup
```

## Summary

By following these steps, you will have successfully set up and connected your chain to the local sequencer. You can now start submitting transactions to your chain.
