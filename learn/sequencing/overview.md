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

An implementation of the sequencing interface mainly acts as a middleware that connects Rollkit rollup and the sequencing layer. It implements the sequencing interface functions described above.
There are several implementations of the sequencor:

* [single-sequencer](/learn/sequencing/single.md) - The simplest and most widely used sequencing model, where a single node (the sequencer) is responsible for ordering transactions and producing blocks.

* [based-sequencer](/learn/sequencing/based.md) - A more decentralized model where multiple sequencers work together to order transactions and produce blocks, improving censorship resistance (Not available yet).

* [forced-inclusion-sequencer](/learn/sequencing/forced-inclusion.md) - A model that ensures all transactions are included in the rollup, even if they are not ordered by the sequencer, providing strong guarantees against censorship. (Not available yet).