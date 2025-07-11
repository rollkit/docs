# ABCI-Compatible Execution Layers in Rollkit

Rollkit is designed to be modular and flexible, allowing different execution layers to be plugged in via the ABCI (Application Blockchain Interface) protocol. This means you can use a variety of ABCI-compatible applications as the execution environment for your rollup.

## Supported Execution Layers

### Cosmos SDK App
A Cosmos SDK-based application can serve as the execution layer for a Rollkit rollup. This allows you to leverage the rich ecosystem and features of the Cosmos SDK, including modules for staking, governance, IBC, and more.

- [Cosmos SDK Documentation](https://docs.cosmos.network/)

### CosmWasm
CosmWasm is a smart contract platform built for the Cosmos ecosystem. It is ABCI-compatible and can be integrated as the execution layer in Rollkit, enabling your rollup to support WebAssembly (Wasm) smart contracts.

- [CosmWasm Documentation](https://docs.cosmwasm.com/)

## How It Works

- Rollkit acts as the consensus and data availability layer.
- The execution layer (Cosmos SDK app or CosmWasm) processes transactions and maintains application state.
- Communication between Rollkit and the execution layer happens via the ABCI protocol.

## Benefits

- **Modularity:** Choose the execution environment that best fits your use case.
- **Interoperability:** Leverage existing Cosmos SDK modules or deploy CosmWasm smart contracts.
- **Extensibility:** Easily upgrade or swap out the execution layer as your rollup evolves.

For more details on integrating an execution layer with Rollkit, see the respective documentation links above.
