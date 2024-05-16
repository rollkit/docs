# GM world UI app

<!-- markdownlint-disable MD033 -->
<script setup>
import constants from '../.vitepress/constants/constants.js'
import Callout from '../.vitepress/components/callout.vue'
</script>

This tutorial aims to demonstrate the user interface (UI) application aspect of connecting a wallet to a rollup, showcasing that it's as straightforward as connecting to any other blockchain. It assumes you have the [Keplr](https://www.keplr.app/) wallet extension installed in your browser.

::: tip
<Callout />
:::

## 🛠 Prerequisites

Before you start, ensure you have completed the [GM world](/tutorials/gm-world) tutorial. Your rollup needs to be running since the app will connect to it via RPC.

You will also need Yarn installed for web app development.

:::tip
If you don't have Yarn or Node.js, run this command to install it using cURL on most Linux distros and macOS:

```bash-vue
curl -sSL https://rollkit.dev/install-yarn.sh | bash -s {{constants.nodeVersion}} {{constants.yarnVersion}}
```

:::

## 📦 Cloning the repo

First, clone the repo with a simple frontend app that connects to the rollup:

```bash
git clone https://github.com/rollkit/gm-frontend.git
cd gm-frontend
```

Next, install the dependencies:

```bash
yarn
```

## 🚀 Running the app

Now, you can run the app using the following command:

```bash
yarn dev
```

You should see the following output indicating that the development server is up and running:

```bash
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info  - SWC minify release candidate enabled. https://nextjs.link/swcmin
event - compiled client and server successfully in 7.8s (2225 modules)
```

## 🔗 Connecting your wallet

To connect your Keplr wallet to the application, simply open your browser and go to [http://localhost:3000](https://localhost:3000).

Click the "Connect Wallet" button on the page, and approve the connection request in the Keplr prompt.

Once authorized, your wallet address will be displayed, confirming that your wallet is successfully connected.

![gm-world-frontend-connected](/img/gm-world-frontend-wallet-connected.png)

:::tip
If you run into any issues, make sure your Keplr wallet is updated and set to connect to your local environment.
:::

## 🎉 Next steps

Congratulations! You've experienced connecting to a rollup from the user side — simple and straightforward. Now, you might consider exploring how to add more application logic to your rollup using the Cosmos SDK, as demonstrated in our Wordle App tutorial.
