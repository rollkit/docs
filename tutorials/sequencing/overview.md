
# Sequencing

 Sequencing is the essential first step for handling your transactions. Think of it as an organizer that takes all incoming transactions, puts them in a clear order, and then groups them into batches. This process is vital for keeping everything consistent and making the rollup run. Rollkit uses a "Sequencing Interface" with key functions like submitting, retrieving, and verifying these transaction batches, ensuring smooth communication between the rollup and the sequencing mechanism, which often acts as a bridge to the underlying network.

## Sequencing Interface {#sequencing-interface}

[Sequencing Interface](https://github.com/rollkit/rollkit/blob/main/core/sequencer/sequencing.go#L11) defines a sequencing interface for communicating between any sequencing network and Rollkit. The key functions of the interface are defined as shown below.

```go
SubmitRollupTransaction(rollupId, data) returns (error)

GetNextBatch(rollupId, lastBatchHash, maxBytes) returns (batch, timestamp)

VerifyBatch(rollupId, batchHash) returns (status)
```

It mainly consists of:

* `SubmitRollupTransaction` relays the rollup transactions from Rollkit rollup to the sequencing network
* `GetNextBatch` returns the next batch of transactions along with a deterministic timestamp
* `VerifyBatch` validates the sequenced batch

## Sequencing Implementations {#sequencing-implementations}

An implementation of the sequencing interface mainly acts as a middleware that connects Rollkit rollup and the sequencing layer. It implements the sequencing interface functions described above. For example, [single-sequencer](https://github.com/rollkit/rollkit/blob/main/sequencers/single/README.md) is the refactored functionality from the Rollkit prior to `v1.0.0`. The single sequencer is the middleware run by the aggregator node of the Rollkit rollup. The aggregator node relays rollup transactions to single sequencer which then submits them to the DA network (Celestia). The header producer node then retrieves (via `GetNextBatch`) the batched transaction from the single sequencer to execute the transactions and produce the updated rollup state. Similarly, there are other sequencing middlewares which can be built for various sequencing strategies or even for connecting to different third-party sequencing networks.

The sequencing implementations that are currently work in progress:
<!-- * [single-sequencer](single) -->
* [based-sequencer](based)
* [forced-inclusion-sequencer](forced-inclusion)
