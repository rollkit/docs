# Building with Rollkit

While Rollkit is a modular framework that aims to be compatible with
a wide range of data availability layers, settlement layers, and
execution environments, the most supported development environment
is building on Celestia as a data availability layer.

## Building from source

### Dependencies

* Requires Go version >= 1.20

To build:

```sh
git clone https://github.com/rollkit/rollkit.git
cd rollkit 
go build -v ./...
```

## Building on Celestia

There are currently 2 ways to build on Celestia:

1. Using a local development environment with [local-celestia-devnet](https://github.com/rollkit/local-celestia-devnet)
2. Using the Arabica or Mocha Celestia testnets*

### Compatibility

| network               | rollkit    | celestia-node | celestia-app |
|-----------------------|------------|---------------|--------------|
| local-celestia-devnet | v0.10.4     | v0.11.0-rc12   | v1.0.0-rc14   |
| arabica               | v0.10.4     | v0.11.0-rc13   | v1.0.0-rc14   |

| rollkit/cosmos-sdk                          | rollkit/cometbft                   | rollkit    |
|---------------------------------------------|------------------------------------|------------|
| [v0.47.3-rollkit-v0.10.4-no-fraud-proofs](https://github.com/rollkit/cosmos-sdk/releases/tag/v0.47.3-rollkit-v0.10.4-no-fraud-proofs)     | v0.37.2 | [v0.10.4](https://github.com/rollkit/rollkit/releases/tag/v0.10.4)     |
| [v0.50.0-rc.0-rollkit-v0.11.0-rc1-no-fraud-proofs](https://github.com/rollkit/cosmos-sdk/releases/tag/v0.50.0-rc.0-rollkit-v0.11.0-rc1-no-fraud-proofs)     | v0.38.0-rc3 | [v0.11.0-rc1](https://github.com/rollkit/rollkit/releases/tag/v0.11.0-rc1)     |

### Local Development Environment

The Rollkit v0.10.4 release is compatible with the
[local-celestia-devnet](https://github.com/rollkit/local-celestia-devnet) [v0.11.0-rc12](https://github.com/rollkit/local-celestia-devnet/releases/tag/v0.11.0-rc12)
release. This version combination is compatible with celestia-app
[v1.0.0-rc14](https://github.com/celestiaorg/celestia-app/releases/tag/v1.0.0-rc14)
and celestia-node
[v0.11.0-rc12](https://github.com/celestiaorg/celestia-node/releases/tag/v0.11.0-rc8).

### Arabica devnet and Mocha testnet

The Rollkit v0.10.4 release is compatible with
[arabica-10](https://docs.celestia.org/nodes/arabica-devnet/) devnet
[mocha-4](https://docs.celestia.org/nodes/mocha-testnet/) testnet which are running
celestia-app
[v1.0.0-rc14](https://github.com/celestiaorg/celestia-app/releases/tag/v1.0.0-rc14)
and celestia-node
[v0.11.0-rc12](https://github.com/celestiaorg/celestia-node/releases/tag/v0.11.0-rc8).

### Cometbft v0.38.x and Cosmos-SDK v0.50.x

The Rollkit v0.11.0-rc1 release is compatible with Cometbft v0.38.0-rc3 and Cosmos-SDK v0.50.0-rc.0. However, there is no support by ignite for launching a compatible app (e.g. gm app) and Rollkit is working on building a gm app for testing this release (WIP).

## Tools

1. Install [golangci-lint](https://golangci-lint.run/usage/install/)
2. Install [markdownlint](https://github.com/DavidAnson/markdownlint)
3. Install [hadolint](https://github.com/hadolint/hadolint)
4. Install [yamllint](https://yamllint.readthedocs.io/en/stable/quickstart.html)

### Helpful Commands

```sh
# Run unit tests
make test

# Generate protobuf files (requires Docker)
make proto-gen

# Run linters (requires golangci-lint, markdownlint, hadolint, and yamllint)
make lint

# Lint protobuf files (requires Docker and buf)
make proto-lint
```

## Contributing

We welcome your contributions! Everyone is welcome to contribute,
whether it's in the form of code,
documentation, bug reports, feature requests, or anything else.

If you're looking for issues to work on, try looking at the
[Good First Issues](https://github.com/rollkit/rollkit/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) on GitHub.
Issues with this tag are suitable for a new external contributor
and is a great way to find something you can help with!

See the [Contributing Guide](https://github.com/rollkit/rollkit/tree/main/CONTRIBUTING.md) for more details.

Please join our [Community Telegram](https://t.me/rollkit)
to ask questions, discuss your ideas, and connect with other contributors.

## Dependency Graph

To see our progress and a possible future of Rollkit visit our
[Dependency Graph](https://github.com/rollkit/rollkit/tree/main/docs/specification/rollkit-dependency-graph.md).
