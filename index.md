---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
titleTemplate: ':title'

hero:
  name: "Rollkit"
  text: "The first sovereign rollup framework"
  tagline: Rollkit utilizes the shared security of a modular data availability network to allow anyone to launch their own sovereign, customizable blockchain as easily as a smart contract
  image:
    src: /logo-big.svg
    alt: Rollkit
  actions:
    - theme: brand
      text: Quick Start 
      link: /tutorials/quick-start
    - theme: alt
      text: Introduction
      link: /learn/intro

features:
  - title: Build with the Best
    details: Utilize all the existing powerful tooling in the Cosmos ecosystem including IBC, ABCI++, and CometBFT RPC equivalency.
    link: /learn/about#why-rollkit
    icon: ✨
  - title: Optimize for your needs
    details: Take full advantage of modularity by optimizing your rollup to your needs. Tailor your block production. Choose your VM. Pick your DA layer.
    link: /learn/stack
    icon: ⚙️
  - title: Take Control
    details: Retain the ability to upgrade via hard forks. Break free of offchain councils holding upgrade keys. Allow your community to be sovereign.
    link: /learn/intro
    icon: 🎮
---
