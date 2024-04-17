---
head:
  - - meta
    - name: title
      content: "Sovereign Rollups: A Modular Expansion of the AppChain Thesis"
  - - meta
    - name: description
      content: Rollkit serves as a community-led public good that empowers developers with the freedom to deploy throughout the modular stack and accelerate innovation
  - - meta
    - name: keywords
      content: Rollkit, Cosmos-SDK
  - - meta
    - name: og:image
      content: /introducing-rollkit/rollkit-blog-cover.png
---

# Sovereign Rollups: A Modular Expansion of the AppChain Thesis

By Rollkit

![Rollkit blog cover](/introducing-rollkit/rollkit-blog-cover.jpg)

### Blockspace should be accessible

Blockspace is a commodity where transaction data is published and stored. It is a medium that allows users to publicly, directly, and verifiably interact with smart contracts and settle transactions. Years of research and hundreds of millions of dollars have been invested into designing protocols that scale blockspace – however, this has resulted in blockchain frameworks that forced critical choices on both users and developers. Secure, dedicated blockspace remains expensive in both cost and developer sacrifice of design freedom.

### Blockspace should be sovereign and dedicated

Since 2018, the Cosmos SDK has offered the best framework for developers to build blockchains that their communities and users own outright. Developers retained the ability to configure crypto-economics, define upgrade features, and enable users to participate in onchain governance. Sovereignty incentivizes the community to pursue long-term value creation.

### Blockspace should be customizable

Developers deserve the ability to customize, experiment, and rapidly iterate on their blockchain. Rollup frameworks should not impose features or architecture nor restrict developers from building for their specific use cases. The Cosmos SDK enables developers to select from powerful modules that implement common functionalities like staking, token transfers, creating NFTs, and governance. This empowers developers to build highly versatile blockchains while retaining the ability to vote for upgrades and change any onchain parameters without delegating that power to any trusted council or multisig. This is the flexibility that developers need and deserve - to build blockchains capable of supporting any use case.

## Introducing Rollkit
Over the past year, we’ve been heads down building. We’ve spoken with teams working on innovative mechanism designs, autonomous worlds, and decentralized infrastructure. While teams found the Cosmos SDK to offer maximal customization and versatility in blockchain design, they were restricted by governance constraints, configuration complexity, and scaling limitations imposed by CometBFT. 

Rollkit is the first rollup framework that enables any developer to launch their own sovereign rollup within minutes, allowing developers to take full advantage of the previously discussed benefits of the Cosmos SDK while breaking free from the resource and validator set coordination overhead necessitated by CometBFT. Rollkit democratizes the Cosmos SDK and liberates developers from the limitations of CometBFT–namely, the need to coordinate global validator sets, to pay validators with an ever-inflating token supply, and to navigate increasing complexity in key management that accompanies an increasing number of validators. 

In the past, developers have been compelled to accept a degree of trust in convincing validators to organize and independently run nodes that secure a new blockchain. This multi-stakeholder environment continuously compromises the community’s values in an effort to align with validators’ pursuit of their own economic self-interest. Attaining consensus on blockchain upgrades has been dependent on appealing to the independent influence of validators that actively participate in onchain governance. The social layer of a Cosmos SDK blockchain hinges on a fragile economic balancing act of monetary parameters. 

This immense commitment in social coordination, time, energy, and expertise is accompanied by an immense cost involved in maintaining validator sets. Projects built using the CometBFT are forced to counter economic gravity in stake consolidation by professional validators and are forced to inflate away their token supply in order to maintain incentive alignment with their validators. Rollkit empowers developers to fulfill the value proposition of the Cosmos SDK framework by focusing on sovereignty and customizability while inheriting shared security from a modular data availability (DA) layer, eliminating the need to spin up validator sets, ensure global coordination among inherently unaligned actors, and spend an excessively high amount of internal resources on blockchain development. 

## An Abundance of Choice
Rollkit retains the customizability of the Cosmos SDK and thereby reflects the values of the development team and its respective community. Developers can take full control over design choices and select which products or features to enshrine within the rollup. Rollkit allows you to:

- Choose between state validity modes: Pessimistic, Optimistic, or ZK or use a combination of both zk and optimistic schemes. 
- Utilize the Sequencing API to delegate sequencing to the shared sequencer network of your choice. 
- Eliminate the need to launch a token or designate the native token or any token for gas fees. 
- Customize block time to just a couple hundred milliseconds. 
- Choose any ABCI++ compatible virtual machine.

Rollups should be sovereign and decentralized, not governed by an offchain council. The developer community can instead define rules via fully onchain governance. Sovereign rollups don’t need to settle to an external blockchain and can instead fully own their settlement. This allows them to protect against hacks or bugs and facilitate upgrades via hard forks.

Rollup operators pay only for data availability. Developers can select any data availability layer and configure fallbacks to other data availability layers or data availability committees if needed. There is no sequencer split required, nor will there ever be a rent seeking model imposed on Rollkit rollups. Rollkit rollups preserve the advantages of a Cosmos SDK blockchain but reduce the overhead of deploying and maintaining your own Cosmos SDK blockchain.

## Build with the Best: Rapid Experimentation with End-to-End Tooling
Rollkit replaces the Cosmos SDK dependency with a Rollkit-enabled version, which can be found at the rollkit/cosmos-sdk repository. This follows the release branches of the upstream Cosmos SDK but uses Rollkit instead of the CometBFT as the ABCI client. 

Rollkit is a fully functional Application Blockchain Interface (ABCI) client software. It can be used as a CometBFT replacement for any ABCI application. This compatibility enables developers to use tools like abci-cli to test and debug rollups. The mature tooling built for Cosmos SDK blockchains is available from day one to Rollkit developers.

Rollkit developers can leverage any base layer for DA (even Bitcoin) without needing to coordinate a global, decentralized validator set. They can still tap into all the extensive tooling and infrastructure built for Cosmos SDK blockchains.

Launch a Rollkit chain on testnet today here and check out the Rollkit repository.

Break Free. Be Sovereign
