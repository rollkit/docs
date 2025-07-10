# Data Availability in Rollkit

Data availability (DA) is a core component of Rollkit's modular rollup framework. In Rollkit, data availability ensures that all transaction data and block information required to verify the rollup's state is accessible to anyone running a node or light client.

## How Rollkit Handles Data Availability

Rollkit is designed to be DA-agnostic, meaning it can integrate with different data availability layers depending on your needs. The main options are:

- **Mock Data Availability (Mock DA):**
  - Simple in-memory DA layer that is great for testing and development.
  - Data is stored and served by the rollup node itself.
  - Not secure for production, as data can be withheld by the node operator.

- **Local Data Availability (Local DA):**
  - Used for development, testing, and local deployments.
  - Not secure for production, as data can be withheld by the node operator.

- **External Data Availability Layer (DA Interface):**
  - Used for production and secure deployments.
  - Rollkit can post block data to any external DA layer that implements the Rollkit [DA interface](https://github.com/rollkit/rollkit/blob/main/core/da/da.go#L11) (e.g., Celestia).
  - Anyone can verify that the data is available and reconstruct the rollup state, depending on the guarantees of the chosen DA layer.

## Why Data Availability Matters in Rollkit

- **Fraud Proofs and Security:**
  - Rollkit rollups rely on data availability to enable fraud proofs and ensure that invalid state transitions can be challenged.
  - If data is unavailable, users cannot verify the rollup's state or submit fraud proofs.

- **Interoperability:**
  - By supporting multiple DA layers, Rollkit enables rollups to be deployed in a variety of environments, from local devnets to scalable, decentralized networks.

## Best Practices

- **Use Mock or Local DA only for development and testing.**
- **For production, always use a decentralized DA layer that implements the Rollkit DA interface.**

## Learn More

- [Set up a local DA](/guides/da/local-da.md)
- [Set up Celestia DA](/guides/da/celestia-da.md)
- [Celestia Docs](https://docs.celestia.org/)
