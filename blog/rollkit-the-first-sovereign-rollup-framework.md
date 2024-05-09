---
head:
  - - meta
    - name: title
      content: "Rollkit: The First Sovereign Rollup Framework"
  - - meta
    - name: description
      content: Launch a sovereign, customizable blockchain as easily as a smart contract
  - - meta
    - name: keywords
      content: Rollkit, Cosmos-SDK
  - - meta
    - name: og:image
      content: /img/Rollkit-cover.jpg
---

<script setup>
import Twitter from '../.vitepress/components/twitter.vue'
</script>

# Rollkit: The First Sovereign Rollup Framework

By Rollkit

![Rollkit blog cover](/img/Rollkit-cover.jpg)

Bitcoin to Ethereum took 7 years.  Ethereum to more scalable alt-L1s took 1–2 years. And then Cosmos SDK and CometBFT brought down time-to-launch a sovereign L1 to months.

Now, Rollkit makes deploying any VM or application on its own sovereign chain as easy as typing **rollkit start**.

<Twitter />

Rollkit provides a path to one-click sovereignty for any crypto application, enabling any developer to launch their own [sovereign rollups](https://blog.celestia.org/sovereign-rollup-chains/) within seconds.

Sovereign rollups combine the self-governance of a Layer 1 with the ease of deploying a rollup. They remove the need to recruit a secure validator set or bootstrap security by prematurely launching a token. Just like an independent L1, sovereign rollups retain the ability to hard fork which allows them to protect against hacks or bugs. This provides its community the ability to enforce social consensus and be sovereign.

Without the overhead of a settlement layer, sovereign rollups can directly interoperate with shared security when using the same DA layer.

By using a generic application interface like [ABCI++](https://docs.cometbft.com/v0.38/spec/abci/), Rollkit is compatible with the Cosmos SDK, the leading framework for building sovereign blockchains. This enables all Cosmos SDK developers to build a sovereign rollup and tap into all the powerful cosmos ecosystem tooling they’re used to including [IBC](https://www.ibcprotocol.dev/), [ABCI++](https://docs.cometbft.com/v0.38/spec/abci/), and Skip Protocol's [Slinky](https://docs.skip.money/slinky/overview/) and [BlockSDK](https://skip-protocol-docs.netlify.app/blocksdk/overview).

Developers have full-freedom to deploy a VM or define their own execution environment, unconstrained by the overhead of an enshrined settlement layer that must process fraud or ZK proofs for their rollups. This means that instead of a canonical on-chain light client that comes with an enshrined settlement layer, sovereign rollups can define how they interoperate with other blockchains by having on-chain light clients of each other as needed.


## Take Control
In the past, developers have been compelled to accept a degree of trust in convincing validators to organize and independently run nodes that secure a new blockchain. This requires launching premature tokens, inflating away their token supply in order to maintain incentive alignment with validators and offset their operational costs. This does not let developers focus on the core product they’re building. Sovereign rollups empower developers to get rid of this need to launch a token prematurely for bootstrapping a validator set and spending an excessively high amount of internal resources on blockchain development.

Existing settled rollups come with the overhead of an enshrined settlement layer like Ethereum L1 where it is difficult and expensive to unwind a token on an L2 and move to another L2 without relying on trusted liquidity bridging intermediaries. This also comes with becoming subordinate to the social consensus of an enshrined settlement layer which they may or may not align with.

Sovereign rollups don’t need to settle to an external blockchain and can instead fully own their settlement. This allows them to protect against hacks and bugs, and facilitate upgrades via hard forks. They introduce rollup light clients that verify DA directly through data availability sampling and verify execution state proofs allowing asynchronous composability as needed. This in turn paves the path forward for trust-minimized interoperability between sovereign chains that share the same DA layer. 

Sovereign rollups remove the need to have a bridge contract that is upgradeable by an offchain council and instead allows the sovereign community to define rules via fully onchain governance.

## Build with the Best

Cosmos SDK’s rich array of developer tooling, battle-tested and refined over the past several years, is available to Rollkit developers from day one. Developers can use popular [wallet infrastructure](https://cosmos.network/wallets/), [block explorers](https://cosmos.network/block-explorers/) and indexers supporting CometBFT RPCs, speak [IBC](https://www.ibcprotocol.dev/) across the interchain, have [Cosmwasm](https://cosmos.network/cosmwasm/) smart contracts along with [Abstract SDK](https://github.com/abstractsdk/abstract), utilize MEV and free lanes via the [BlockSDK](https://docs.skip.money/blocksdk/overview/) and enshrine oracles in block production with [Slinky](https://docs.skip.money/slinky/overview/) from Skip Protocol. [More cosmos related resources.](https://github.com/cosmos/awesome-cosmos)

Rollkit rollups interact with a state machine via the Application Blockchain Interface ([ABCI++](https://docs.cometbft.com/v0.38/spec/abci/)). This allows it to be used as an alternative to CometBFT for any ABCI application. Rollkit comes with a [custom start handler](https://github.com/rollkit/cosmos-sdk-starter) that can be used by Cosmos SDK blockchains to use it as its ABCI client while still following the release branches of upstream Cosmos SDK.  This compatibility enables developers to use tools like [abci-cli](https://docs.cometbft.com/v0.38/app-dev/abci-cli) to test and debug rollups.

## Optimize for your needs
Rollkit allows developers to optimize between the different modular components  of a sovereign chain as needed. Rollkit allows you to:
- Choose between data availability layers that implement the [go-da interface](https://github.com/rollkit/go-da).
- Choose any ABCI++ compatible virtual machine.
- Utilize the Sequencing API to delegate sequencing to the shared sequencer network of your choice or even delegate sequencing to the DA layer to go [based](https://ethresear.ch/t/based-rollups-superpowers-from-l1-sequencing/15016).
- Choose between state validity modes: Pessimistic, Optimistic, or ZK or use a combination of both zk and optimistic schemes. 
- Eliminate the need to launch a token or designate the native token or any token for gas fees. 
- Customize block time to just a couple hundred milliseconds and produce blocks only when needed.
- Configure the fork choice rule.

Rollkit rollups pay only for data availability on demand. There is no sequencer split required, nor will there ever be any kind of rent seeking model imposed on Rollkit rollups. Rollkit rollups preserve the advantages of a Cosmos SDK blockchain but reduce the overhead of deploying and maintaining a validator set.

## Break Free. Be Sovereign.

[Get started](https://rollkit.dev/tutorials/quick-start) with launching your own sovereign chain with Rollkit.
If you’re thinking of building a sovereign chain, we’d love to hear from you. Fill out this [form](https://forms.gle/yumLqipqr8weYmAb7).
