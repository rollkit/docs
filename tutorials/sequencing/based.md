# Integrating the `based.Sequencer` into Your Rollup

This tutorial provides a step-by-step guide for integrating the `based.Sequencer` from Rollkit into your own rollup project. It is designed to be more in-depth, helping you understand not just the code, but also the architectural flow and where to begin.

---

## Overview: What is the `based.Sequencer`?

The `based.Sequencer` is a component that manages transaction batching, submission, and retrieval for rollups that use a Data Availability (DA) layer. It is designed for advanced rollup scenarios where you want to synchronize with an external DA layer (such as another chain or service) and handle concepts like height drift, persistent pending transactions, and robust batch submission with retries.

---

## When Should You Use the `based.Sequencer`?

- You want your rollup to follow or synchronize with an external DA layer (e.g., a parent L1 or another rollup).
- You need to handle advanced DA features like height drift, batch retries, and persistent mempool.
- You want to build a rollup that can operate in 'based' mode, as seen in the Rollkit EVM-based example.

---

### Prerequisites

- A Rollkit-based rollup project (see the [Rollkit repo](https://github.com/rollkit/rollkit)).
- A DA layer endpoint (or use the DummyDA for local testing).
- Familiarity with Go modules and the Rollkit configuration system.

---

### 1. Project Structure and Where to Start

**Start in your rollup's main entrypoint** (usually a `cmd/run.go` or similar). This is where you will:

- Parse configuration
- Set up logging
- Initialize the DA client(s)
- Set up persistent storage
- Instantiate the `based.Sequencer`
- Wire up the rest of your node (executor, P2P, etc.)

**Reference Example:**

- See `rollups/evm/based/cmd/run.go` in the Rollkit repo for a full working example.

---

### 2. Import Required Packages

```go
import (
    "context"
    "fmt"
    "os"
    "path/filepath"

    "github.com/rollkit/rollkit/da/jsonrpc"
    "github.com/rollkit/rollkit/pkg/cmd"
    "github.com/rollkit/rollkit/pkg/config"
    "github.com/rollkit/rollkit/pkg/p2p"
    "github.com/rollkit/rollkit/pkg/p2p/key"
    "github.com/rollkit/rollkit/pkg/store"
    "github.com/rollkit/rollkit/sequencers/based"
    // ...other imports as needed
)
```

---

### 3. Parse Configuration and Set Up Logger

```go
nodeConfig, err := rollcmd.ParseConfig(cmd)
if err != nil {
    return err
}
logger := rollcmd.SetupLogger(nodeConfig.Log)
```

---

### 4. Initialize the Data Availability (DA) Layer

You may want to support both a production DA (via JSON-RPC) and a local DummyDA for testing:

```go
var da coreda.DA
if nodeConfig.DA.AuthToken != "" {
    client, err := jsonrpc.NewClient(ctx, logger, nodeConfig.DA.Address, nodeConfig.DA.AuthToken, nodeConfig.DA.Namespace)
    if err != nil {
        return fmt.Errorf("failed to create DA client: %w", err)
    }
    da = &client.DA
} else {
    da = coreda.NewDummyDA(100_000, 0, 0)
}
```

---

### 5. Set Up Persistent Storage

```go
datastore, err := store.NewDefaultKVStore(nodeConfig.RootDir, nodeConfig.DBPath, "based")
if err != nil {
    return fmt.Errorf("failed to create datastore: %w", err)
}
```

---

### 6. Instantiate the `based.Sequencer`

You need to provide:

- Logger
- DA implementation
- Rollup ID (usually your chain ID as bytes)
- DA start height (where to begin scanning the DA layer)
- Max height drift (how far ahead you can scan)
- Persistent datastore

```go
sequencer, err := based.NewSequencer(
    logger,
    da,
    []byte(nodeConfig.ChainID),
    daStartHeight,      // e.g., from config or flag
    maxHeightDrift,     // e.g., from config or flag
    datastore,
)
if err != nil {
    return fmt.Errorf("failed to create based sequencer: %w", err)
}
```

---

### 7. Set Up P2P Networking (Optional, but recommended)

```go
nodeKey, err := key.LoadNodeKey(filepath.Dir(nodeConfig.ConfigPath()))
if err != nil {
    return fmt.Errorf("failed to load node key: %w", err)
}
p2pClient, err := p2p.NewClient(nodeConfig, nodeKey, datastore, logger, p2p.NopMetrics())
if err != nil {
    return fmt.Errorf("failed to create P2P client: %w", err)
}
```

---

### 8. Start Your Node

Wire up all components and start your node:

```go
return rollcmd.StartNode(
    logger,
    cmd,
    executor,    // Your application executor
    sequencer,   // The based sequencer
    da,          // DA client
    nodeKey,
    p2pClient,
    datastore,
    nodeConfig,
)
```

---

### 9. (Optional) Support Multiple DA Layers

You can instantiate multiple DA clients (e.g., one for rollup, one for 'based' parent) and pass the appropriate one to the sequencer. See the EVM-based example for how to wire this up with flags and config.

---

### 10. Advanced: Understanding the `based.Sequencer` Flow

- **Pending Queue:** Transactions are added to a persistent queue until they are included in a batch.
- **Batch Submission:** Batches are submitted to the DA layer with retries, exponential backoff, and gas price adjustments.
- **Batch Retrieval:** The sequencer can scan the DA layer for new batches, respecting height drift and start height.
- **Verification:** The sequencer can verify batches using DA proofs.

---

### 11. Reference: Example Flag Setup

You may want to expose flags for DA endpoints, start height, max drift, etc. Example:

```go
cmd.Flags().StringVar(&basedURL, based.FlagBasedURL, "http://localhost:26658", "Based API URL")
cmd.Flags().StringVar(&basedAuth, based.FlagBasedAuth, "", "Authentication token for Based API")
cmd.Flags().StringVar(&basedNamespace, based.FlagBasedNamespace, "", "Namespace for Based API")
cmd.Flags().Uint64Var(&basedStartHeight, based.FlagBasedStartHeight, 0, "Starting height for Based API")
cmd.Flags().Uint64Var(&basedMaxHeightDrift, based.FlagBasedMaxHeightDrift, 1, "Maximum L1 block height drift")
```

---

## Summary of Required Components

- **Logger**: For structured logging.
- **Config**: Node and application configuration.
- **DA Client**: JSON-RPC client or DummyDA for Data Availability.
- **Datastore**: Persistent storage for batches and state.
- **Sequencer**: The `based.Sequencer` instance.
- **P2P Client**: For networking (if needed).
- **Executor**: Your rollup’s application logic.

---

## Tips

- The `based.Sequencer` is ideal for advanced rollup scenarios with external DA layers.
- Use persistent storage to avoid losing pending transactions on restart.
- Tune `daStartHeight` and `maxHeightDrift` for your chain’s needs.
- See the EVM-based example in Rollkit for a full working integration.

---

**If you need a minimal code template or have questions about a specific integration step, let me know!**
