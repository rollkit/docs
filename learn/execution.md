# Execution Layers in Rollkit

Rollkit is designed to be modular and flexible, allowing different execution layers to be plugged in via the ABCI (Application Blockchain Interface) protocol. Rollkit defines a general-purpose execution interface ([see execution.go](https://github.com/rollkit/rollkit/blob/main/core/execution/execution.go)) that enables developers to integrate any compatible application as the rollup's execution layer.

This means you can use a variety of ABCI or Reth compatible applications as the execution environment for your rollup.

## Supported Execution Layers

### ABCI-Compatible Execution Layers

Any ABCI-compatible application can be used as the execution layer for a Rollkit rollup. This flexibility allows developers to choose the best execution environment for their use case, whether it's a custom application or an existing framework.

A common example is a Cosmos SDK-based application, which provides a rich set of modules for staking, governance, IBC, and more, and is widely used in the Cosmos ecosystem.

- [Cosmos SDK Documentation](https://docs.cosmos.network/)
- [Cosmos SDK ABCI Documentation](https://docs.cosmos.network/main/build/abci/introduction)
- [Rollkit ABCI Adapter](https://github.com/rollkit/go-execution-abci)

### Reth

Reth is a high-performance Ethereum execution client written in Rust. Rollkit can integrate Reth as an execution layer, enabling Ethereum-compatible rollups to process EVM transactions and maintain Ethereum-like state. This allows developers to build rollups that leverage the Ethereum ecosystem, tooling, and smart contracts, while benefiting from Rollkit's modular consensus and data availability.

For more information about Reth, see the official documentation:

- [Reth GitHub Repository](https://github.com/paradigmxyz/reth)
- [Rollkit Reth Integration](https://github.com/rollkit/lumen)

## How It Works

- Rollkit acts as the consensus and data availability layer.
- The execution layer (Cosmos SDK app or Reth) processes transactions and maintains application state.
- Communication between Rollkit and the execution layer happens via the ABCI protocol or other supported interfaces.

## Benefits

- **Modularity:** Choose the execution environment that best fits your use case.
- **Interoperability:** Leverage existing Cosmos SDK modules, deploy CosmWasm smart contracts, or use EVM tooling with Reth.
- **Extensibility:** Easily upgrade or swap out the execution layer as your rollup evolves.

For more details on integrating an execution layer with Rollkit, see the respective documentation links above.
