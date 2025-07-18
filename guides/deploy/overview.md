---
description: This page provides an overview of some common ways to deploy rollups.
---

# 🚀 Deploying Your Rollup

One of the benefits of building rollups with Rollkit is the flexibility you have as a developer to choose things like the DA layer, the settlement scheme, and the execution environment.

You can learn more about Rollkit architecture [here](/learn/specs/overview.md).

The challenge that comes with this flexibility is that there are more services that now need to be deployed and managed while running your rollup.

In the tutorials so far, you've seen various helper scripts used to make things easier. While great for tutorials, there are better ways to deploy and manage rollups than using various bash scripts.

## 🏗️ Deployment Scales

Depending on your needs and the stage of your rollup development, there are different deployment approaches you can take:

### 🏠 Local Development
For development and testing purposes, you can deploy your rollup locally using containerized environments. This approach provides:
- Quick iteration and testing
- No external dependencies
- Full control over the environment
- Cost-effective development

### 🌐 Testnet Deployment
When you're ready to test with real network conditions, you can deploy to testnet environments. This includes:
- Integration with testnet DA networks
- Real network latency and conditions
- Multi-node testing scenarios
- Pre-production validation


## 📚 Available Deployment Guides

Choose the deployment approach that matches your current needs:

* [🏠 Local Development with Docker Compose](./local.md) - Deploy locally for development and testing
* [🌐 Testnet Deployment](./testnet.md) - Deploy on testnet with external DA networks

:::warning Disclaimer
These examples are for educational purposes only. Before deploying your rollup for production use you should fully understand the services you are deploying and your choice in deployment method.
:::

## 🎉 Next Steps

For production mainnet deployments, consider additional requirements such as monitoring, security audits, infrastructure hardening, and operational procedures that go beyond the scope of these tutorials.
