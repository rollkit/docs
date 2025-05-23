# Single Sequencer

## Integrating `single.Sequencer` into Your System

This guide walks you through integrating the `single.Sequencer` from Rollkit into your custom system application. The process is modeled after the [`testapp`](https://github.com/rollkit/rollkit/blob/main/rollups/testapp/cmd/run.go) example, focusing on the main steps and required components.

---

### 1. Import Required Packages

In your main application (e.g., your `cmd/run.go`), import the following:

```go
import (
    "context"
    "fmt"
    "path/filepath"

    "cosmossdk.io/log"
    "github.com/rollkit/rollkit/da/jsonrpc"
    "github.com/rollkit/rollkit/pkg/cmd"
    "github.com/rollkit/rollkit/pkg/config"
    "github.com/rollkit/rollkit/pkg/p2p"
    "github.com/rollkit/rollkit/pkg/p2p/key"
    "github.com/rollkit/rollkit/pkg/store"
    "github.com/rollkit/rollkit/sequencers/single"
    // ...other imports as needed
)
```

---

### 2. Set Up Configuration and Logger

Parse your node configuration and set up logging:

```go
nodeConfig, err := rollcmd.ParseConfig(cmd)
if err != nil {
    return err
}
logger := rollcmd.SetupLogger(nodeConfig.Log)
```

---

### 3. Initialize the Data Availability (DA) Layer

Create a JSON-RPC DA client:

```go
ctx, cancel := context.WithCancel(context.Background())
defer cancel()

daJrpc, err := jsonrpc.NewClient(ctx, logger, nodeConfig.DA.Address, nodeConfig.DA.AuthToken, nodeConfig.DA.Namespace)
if err != nil {
    return err
}
```

---

### 4. Set Up the Datastore

Create a persistent key-value store for your system:

```go
datastore, err := store.NewDefaultKVStore(nodeConfig.RootDir, nodeConfig.DBPath, "yourapp")
if err != nil {
    return err
}
```

---

### 5. Initialize Sequencer Metrics (Optional)

If you want metrics, set them up (or use `NopMetrics` for no-op):

```go
singleMetrics, err := single.NopMetrics()
if err != nil {
    return err
}
```

---

### 6. Create the Single Sequencer

Instantiate the sequencer with the required parameters:

```go
sequencer, err := single.NewSequencer(
    ctx,
    logger,
    datastore,
    &daJrpc.DA, // Pass the DA client
    []byte(nodeConfig.ChainID), // System ID
    nodeConfig.Node.BlockTime.Duration, // Batch time
    singleMetrics,
    nodeConfig.Node.Aggregator, // Proposer flag
)
if err != nil {
    return err
}
```

---

### 7. Set Up P2P Networking (Optional, but recommended)

If your system uses P2P, initialize the client:

```go
nodeKey, err := key.LoadNodeKey(filepath.Dir(nodeConfig.ConfigPath()))
if err != nil {
    return err
}

p2pClient, err := p2p.NewClient(nodeConfig, nodeKey, datastore, logger, p2p.NopMetrics())
if err != nil {
    return err
}
```

---

### 8. Start Your Node

Finally, start your node with all the components:

```go
return rollcmd.StartNode(
    logger,
    cmd,
    executor,    // Your application executor
    sequencer,   // The single sequencer
    &daJrpc.DA,  // DA client
    nodeKey,
    p2pClient,
    datastore,
    nodeConfig,
)
```

---

## 9. (Optional) Start Any Application-Specific Services

For example, if you have an HTTP server for your executor, start it before the main node loop.

---

## Summary of Required Components

- **Logger**: For structured logging.
- **Config**: Node and application configuration.
- **DA Client**: JSON-RPC client for Data Availability.
- **Datastore**: Persistent storage for batches and state.
- **Sequencer**: The `single.Sequencer` instance.
- **P2P Client**: For networking (if needed).
- **Executor**: Your system’s application logic.

---

## Tips

- The `single.Sequencer` expects a batch submission channel to be set if you use batch submission loops.
- The DA client must implement the `coreda.DA` interface.
- The System ID should be unique for your chain.
- The batch time controls how frequently batches are produced.

---

**For a full working example, see the [`testapp`]<https://github.com/rollkit/rollkit/blob/main/rollups/testapp/cmd/run.go> in the Rollkit repo. Adapt the above steps to your own application’s needs.**
