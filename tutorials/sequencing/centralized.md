# Centralized Sequencer

<!-- markdownlint-disable MD033 -->
<script setup>
import constants from '../../.vitepress/constants/constants.js'
</script>

A centralized sequencer is a sequencing middleware that receives rollup transactions and provides a local sequencing capabilities. Meaning, the transactions are ordered in the order they are received by the sequencer without any censorship. Further, the sequenced batches are made available in the DA network (such as Celestia). Under the hood, the centralized sequencer is a GRPC server that implements `go-sequencing` interface and the server is hosted by the same node that is running the aggregator for the Rollkit rollup.

![Rollkit with Centralized Sequencer](/public/img/sequencing.jpg)

## Prerequisites {#prerequisites}

This tutorial serves as a comprehensive guide for using the [centralized-sequencer](https://github.com/rollkit/centralized-sequencer) with your chain. 

Before proceeding, ensure that you have completed the [quick start](/tutorials/quick-start) or [build a chain](/tutorials/wordle) tutorial, which covers installing the rollkit CLI, building your chain, and running your chain.

:::tip
It is important to note that the centralized sequencer expects a DA layer to be running when it starts. This means that you need to launch your DA Layer before starting the centralized sequencer.
:::

Additionally, you should have completed one of the [DA Layer tutorials](../da/overview) and have your DA layer ready to use with the centralized sequencer. This tutorial will use the [local-da layer](../da/local) as an example.

## Installation the Centralized Sequencer {#installation-centralized-sequencer}

```sh-vue
git clone --depth 1 --branch {{constants.centralizedSequencerLatestTag}} https://github.com/rollkit/centralized-sequencer.git
cd centralized-sequencer
make build
./build/centralized-sequencer -h
```

You should see the following output:

```sh
Usage:
  -host string
    	centralized sequencer host (default "localhost")
  -port string
    	centralized sequencer port (default "50051")
  -listen-all
    	listen on all network interfaces (0.0.0.0) instead of just localhost
  -rollup-id string
    	rollup id (default "rollupId")
  -batch-time duration
    	time in seconds to wait before generating a new batch (default 2s)
  -da_address string
    	DA address (default "http://localhost:26658")
  -da_auth_token string
    	auth token for the DA
  -da_namespace string
    	DA namespace where the sequencer submits transactions
  -db_path string
    	path to the database
...
```

As shown by the help command, a centralized sequencer is configured to serve a rollup (via `rollup_id`). The DA network to persist the sequenced batches are specified using `da_address`, `da_auth_token` and `da_namespace`.


## Run the centralized sequencer {#run-the-centralized-sequencer}

:::tip
As mentioned in the prerequisities, you should have your DA layer running. These steps assume the local-da is running on `http://localhost:7980`.
:::

Start your centralized sequencer with the following command:

::: code-group

```sh [Quick Start]
./build/centralized-sequencer -rollup-id my-rollup -da_address http://localhost:7980
```

```sh [Build a Chain]
./build/centralized-sequencer -rollup-id wordle -da_address http://localhost:7980
```
:::


## Run your chain {#run-your-chain}

To connect your chain to the centralized sequencer, you need to pass the `--rollkit.sequencer_address` flag with the local sequencer address and the `--rollkit.sequencer_rollup_id` to ensure your rollup id matches what the sequencer is expecting.

Start your chain with the following command, ensuring to include the sequencer flag:

::: code-group

```sh [Quick Start]
rollkit start \
    --rollkit.da_address http://localhost:7980 \
    --rollkit.sequencer_address localhost:50051 \
    --rollkit.sequencer_rollup_id my-rollup
```

```sh [Wordle Chain]
rollkit start \
    --rollkit.aggregator \
    --rollkit.da_address http://localhost:7980 \
    --rollkit.sequencer_address localhost:50051 \
    --rollkit.sequencer_rollup_id wordle
```

:::

You should see the following log messages indicating that your chain is connected to the local sequencer:

```sh
I[2024-11-15|15:22:33.636] sequencer already running                 module=main address=localhost:50051
I[2024-11-15|15:22:33.636] make sure your rollupID matches your sequencer module=main rollupID=my-rollup
```

Then after a few blocks you should see this message confirming that your sequencer is successfully submitting batches to the DA layer:

```sh
I[2024-11-15|16:04:07.698] successfully submitted Rollkit headers to DA layer module=BlockManager gasPrice=-1 daHeight=1 headerCount=14
```

## Metrics {#metrics}

The `centralized-sequencer` node reports Prometheus metrics when the `-metrics` flag is enabled.

By default, metrics are exported to `http://localhost:8080/metrics`.

The listening address and port can be configured with the `-metrics-address` flag.

The following metrics are available:

| **Name**                                  | **Type**  | **Tags**  | **Description**                                                        |
|-------------------------------------------|-----------|-----------|------------------------------------------------------------------------|
| sequencer_gas_price                       | Gauge     |           | Gas price of the DA transaction                                         |
| sequencer_last_blob_size                  | Gauge     |           | Last blob size submitted to the DA                                      |
| sequencer_transaction_status              | Gauge     |           | Transaction status of the DA transaction                                |
| sequencer_num_pending_blocks              | Gauge     |           | Number of blocks pending DA submission                                  |
| sequencer_included_block_height           | Gauge     |           | Block height of the last DA transaction                                 |

## Summary {#summary}

By following these steps, you will have successfully set up and connected your chain to the centralized sequencer. You can now start submitting transactions to your chain.
