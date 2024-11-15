# Sequencing

The next step after choosing your DA layer is to choose your sequencing scheme. 

## Rollkit prior to Sequencing
Rollkit's aggregator node was responsible for selecting and ordering transactions for including in the rollup blocks. The Rollkit aggregator used to follow a FCFS strategy, where every transaction submitted gets included in the block in order without any censorship. Use of a different sequencing strategy or connecting to a sequencing network (e.g., Astria) was not possible. Rollkit [v0.14.0](https://github.com/rollkit/rollkit/releases/tag/v0.14.0) onwards makes it possible for rollkit to connect to a sequencing network and communicate via grpc.

## Sequencing Interface {#sequencing-interface}

[go-sequencing](https://github.com/rollkit/go-sequencing) defines a sequencing interface for communicating between any sequencing network and Rollkit. The key functions of the interface are defined as shown below.

```go
SubmitRollupTransaction(rollupId, data) returns (error)

GetNextBatch(rollupId, lastBatchHash, maxBytes) returns (batch, timestamp)

VerifyBatch(rollupId, batchHash) returns (status)
```

It mainly consists of:
* `SubmitRollupTransaction` relays the rollup transactions from Rollkit rollup to the sequencing network 
* `GetNextBatch` returns the next batch of transactions along with a deterministic timestamp
* `VerifyBatch` validates the sequenced batch

## Mock Sequencer {#mock-sequencer}

You might have noticed that we did not define a specific sequencer during the [quick start](../quick-start.md) or [build a chain](../wordle.md) tutorials. This is because we used a mock sequencer that is built into Rollkit.

If you revisit the logs from those tutorials, you will see one of the first lines being:

```shell
I[2024-11-15|14:54:19.843] Starting mock sequencer    module=main address=localhost:50051 rollupID=test-rollup-a736683c
```

The mock sequencer is a simple in-memory sequencer that is great for testing and development. It is not suitable for production use.

## Sequencing Implementations {#sequencing-implementations}

An implementation of the sequencing interface mainly acts as a middleware that connects Rollkit rollup and the sequencing layer. It implements the sequencing interface functions described above. For example, [centralized-sequencer](https://github.com/rollkit/centralized-sequencer) is the refactored functionality from the Rollkit prior to `v0.14.0`. The centralized sequencer is the middleware run by the aggregator node of the Rollkit rollup. The aggregator node relays rollup transactions to centralized sequencer which then submits them to the DA network (such as Celestia). The header producer node then retrieves (via `GetNextBatch`) the batched transaction from the centralized sequencer to execute the transactions and produce the updated rollup state. Similarly, there are other sequencing middlewares which can be built for various sequencing strategies or even for connecting to different third-party sequencing networks. 

The sequencing implementations that are currently work in progress:
* [local-sequencer](local)
* [centralized-sequencer](centralized)
* [based-sequencer](based)
* [forced-inclusion-sequencer](forced-inclusion)
* [astria-sequencer](astria)
