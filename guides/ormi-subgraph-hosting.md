# Using Ormi's 0xgraph Subgraph Hosting Solution 

## Introduction

[Ormi Labs](https://app.0xgraph.xyz/dashboard/api) offers a powerful solution for hosting and managing subgraphs, which can be particularly useful for Rollkit rollups and their ecosystems - enabling dApps with low-latency and reliable real-time data. This beginner guide aims to demonstrate the capabilities of 0xgraph's subgraph hosting solution for rollup teams. 

Please note that network support for your specific rollup will need to be added before subgraphs can be fully migrated. To get network support added for your rollup, please reach out to the Ormi team at julian@ormi.xyz.

This guide will walk you through the process of using Ormi's services to host your Subgraphs, providing insight into how these services can enhance the real-time data querying capabilities of your Rollkit rollups ecosystem once network support is implemented.

## Prerequisites

- Node.js installed on your system
- Basic understanding of Subgraphs and GraphQL APIs

## Getting Started with Ormi

### 1. Install the 0xgraph CLI
First, install the 0xgraph CLI tool:
```bash
npm i @xgraph/cli
```

### 2. Authentication
Next you'll need to authenticate with Ormi using your API key. You can obtain this key by signing up at https://app.0xgraph.xyz/dashboard/api.

Once you have your API key, authenticate with Ormi using the following command:

```bash
0xgraph auth

## Creating and Deploying Your Subgraph
### 1. Prepare Your Subgraph
Ensure your Subgraph project follows the standard structure:
- Subgraph.yaml: The manifest file
- Schema.graphql: The schema file
- Mapping files (typically in AssemblyScript)

### 2. Generate Types and Mappings
Run the following command in your Subgraph project root:
```bash
0xgraph codegen
```
### 3. Build Your Subgraph
Build your Subgraph using:
```bash
0xgraph build
```
### 4. Create/Register Your Subgraph
Choose a unique name for your Subgraph and register it
```bash
0xgraph create <my-subgraph-name>
```
### 5. Deploy Your Subgraph 
Deploy your subgraph to Ormi's hosted service:
```bash
0xgraph deploy
```
Follow the prompts to specify your subgraph name and version.


## Conclusion
By leveraging Ormi for subgraph hosting, Rollkit rollup teams can gain valuable insights into the powerful data indexing and querying capabilities that can enhance their ecosystems. This integration paves the way for more efficient data retrieval and analysis, potentially improving the overall performance and functionality of Rollkit-based projects.

The 0xgraph solution offers a glimpse into the future of decentralized data management for rollups, promising low-latency access to real-time data that can significantly boost dApp performance and user experience. As the blockchain space continues to evolve, tools like Ormi's subgraph hosting service are becoming increasingly crucial for building scalable and efficient decentralized applications.

While this guide provides a starting point, remember that full integration requires network support for your specific rollup. We encourage rollup teams to reach out to Ormi Labs to discuss adding support for their networks, unlocking the full potential of this powerful tool for their ecosystems.

For more detailed information on subgraph development and best practices, refer to The Graph's official documentation and the Messari subgraphs repository. Stay tuned for updates as Ormi continues to expand its network support and feature set, bringing advanced data solutions to an ever-growing number of blockchain ecosystems.

Links: [Ormi Labs](https://ormi.xyz/) | [0xgraph docs](https://docs.ormi.xyz/0xgraph) | [X](https://x.com/ormilabs)