---
sidebar_label: Building with Rollkit
description: Learn about the different ways you can build with Rollkit.
---

# Building with Rollkit

While Rollkit is a modular framework that aims to be compatible with
a wide range of data availability layers, settlement layers, and
execution environments, the most supported development environment
is building on Celestia as a data availability layer.

## Building from source

### Dependencies

* Requires Go version >= 1.19

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
| local-celestia-devnet | v0.9.0     | v0.11.0-rc8   | v1.0.0-rc7   |
| arabica               | v0.9.0     | v0.11.0-rc8   | v1.0.0-rc7   |

| rollkit/cosmos-sdk                          | rollkit/cometbft                   | rollkit    |
|---------------------------------------------|------------------------------------|------------|
| v0.46.13-rollkit-v0.9.0-no-fraud-proofs     | v0.0.0-20230524013049-75272ebaee38 | v0.9.0     |
| v0.45.16-rollkit-v0.9.0-no-fraud-proofs     | v0.0.0-20230524013001-2968c8b8b121 | v0.9.0     |

### Local Development Environment

The Rollkit v0.9.0 release is compatible with the
[local-celestia-devnet](https://github.com/rollkit/local-celestia-devnet)
[oolong](https://github.com/rollkit/local-celestia-devnet/releases/tag/v0.11.0-rc8)
release. This version combination is compatible with celestia-app
[v1.0.0-rc7](https://github.com/celestiaorg/celestia-app/releases/tag/v1.0.0-rc7)
and celestia-node
[v0.11.0-rc8](https://github.com/celestiaorg/celestia-node/releases/tag/v0.11.0-rc8).

### Arabica devnet and Mocha testnet

:::warning
**Rollkit v0.9.0 is not compatible with latest release of Mocha.**
:::

The Rollkit v0.9.0 release is compatible with Arabica devnet which is
running celestia-app
[v1.0.0-rc7](https://github.com/celestiaorg/celestia-app/releases/tag/v1.0.0-rc7)
and celestia-node
[v0.11.0-rc8](https://github.com/celestiaorg/celestia-node/releases/tag/v0.11.0-rc8).

## Testing

1. Install [golangci-lint](https://golangci-lint.run/usage/install/)
2. Install [markdownlint](https://github.com/DavidAnson/markdownlint)
3. Install [hadolint](https://github.com/hadolint/hadolint)
4. Install [yamllint](https://yamllint.readthedocs.io/en/stable/quickstart.html)

### Helpful Commands

```sh
# Run unit tests
make test-unit

# Run unit tests with the data race detector
make test-unit-race

# Run tests with and without the data race detector
make test-all

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
[good first issue list](https://github.com/rollkit/rollkit/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).
Issues with this tag are suitable for a new external contributor
and is a great way to find something you can help with!

See [the contributing guide](https://github.com/rollkit/rollkit/tree/main/CONTRIBUTING.md) for more details.

Please join our [Community Discord](https://discord.com/invite/YsnTPcSfWQ)
to ask questions, discuss your ideas, and connect with other contributors.

## Dependency Graph

To see our progress and a possible future of Rollkit visit our
[Dependency Graph](https://github.com/rollkit/rollkit/tree/main/docs/specification/rollkit-dependency-graph.md).
