# Rollup glossary

A wiki of terms to define different Rollup designs and terminology:

<!-- **Types of Rollup Designs:**

* [Basic Rollup](/learn/basic-rollup)
* [Based Pessimistic Rollup](/learn/based-pessimistic-rollup)
* [Pessimistic Rollup with a Shared Sequencer](/learn/pessimistic-rollup-with-a-shared-sequencer)
* Pessimistic Rollup with Based and Shared Sequencing
* Based Rollup with a Centralized Sequencer
* Optimistic Rollup with a Centralized Header Producer
* Based ZK Rollup with a Decentralized Prover Market
* Based Rollup with a Header Producer Competition Maximizing Protocol MEV -->

## Terminology

### Aggregation

Aggregation is the process of batching transactions into one batch. A batch of transactions consists of one or more transactions.

### Based rollup

A based rollup is a rollup that delegates aggregation to a DA-Layer.

### Execution

Execution is the process by which the transactions in the blockchain are processed and their effects are applied to the state of the blockchain.

### Header production

Header production is the process of creating the Rollup header backed by specific security properties.

### Inclusion

Inclusion is the process by which a transaction is accepted into the blockchain.

### Ordering

Ordering is the process of arranging transactions in a specific sequence in the blockchain.

### Pessimistic rollup

A pessimistic rollup is a rollup that only supports full nodes that replay all the transactions in the rollup to check its validity.

### Rollup Block

A rollup block is a data structure representing the Blockchain at a certain height. It consists of [**Rollup Data**](#rollup-data) and
[**Rollup Headers**](#rollup-header).

### Rollup Data

Rollup data is either a batch of transactions or the state difference between transaction batches.

### Rollup Header

is metadata about the block which at minimum includes a commitment to the transactions in that block.

### Rollups

Rollups are blockchains that post their Transaction Data to another blockchain and inherit its consensus and data availability.

### Sequencing

Sequencing is the process of aggregation and header production.
