# How to integrate Range with your rollup

This section illustrates how Rollkit developers can leverage the Range platform to monitor their rollup activity and explore relevant addresses and transactions in less than 5 minutes.

## Overview

In this guide, we’ll go over the steps of the integration of our sample rollup GM, which is divided into three sections:

1. **Integrate your rollup with Range and start the indexing.**
2. **Add your addresses and contracts.**
3. **Create your first alert and explore transactions.**

## Prerequisites

You need to have an operational rollkit rollup. If you haven't done so, you'll need to complete the [GM world](../tutorials/gm-world) tutorial first.

### 1. Integrate Your Rollup

We’ll integrate our rollup GM into Range and start indexing blocks and transactions in real-time.

![custom-network](/public/range-rollkit/custom-network.png)

#### Steps

- Create an account in [Range](https://app.range.org)
- Make sure you have a public RPC endpoint of your Rollkit rollup
- Go to the settings tab on your account profile in the top-right corner
- Click the **Add Network** button in the Custom Network section
- Choose Rollkit and fill out the form
- Congrats! Your rollup should be integrated in Range in less than 15 seconds.

### 2. Add Your Addresses and Contracts

Now that your rollup is integrated into Range, you can customize your workspace. The first step is adding addresses and contracts that you want to monitor. For that, head to the Address section:

![import-address](/public/range-rollkit/import-address.png)

Once you’ve added one or multiple addresses, you can start looking at the real-time transactions explorer in the Transactions tab.

### 3. Creating Your First Alert Rule

Now, you can set up alerts to monitor specific events or transactions in your rollup. As an example, we can create an alert that notifies us every time our address is involved in a successful transaction:

![alert-rules](/public/range-rollkit/alert-rule.png)

After executing a sample transaction:

```bash
gmd tx bank send gm-991hesf7xgmjwttag2n2wzk43rvxh47nn4ckh3e6s gm-991rcctqc5l4px95k6tdg4pjrms70m2a9t35rl50t 4039stake --keyring-backend test --node tcp://127.0.0.1:36657 --chain-id gm --fees 5000stake
```

The alert events will appear both in the Overview tab and the Alerting section:

![alert-events](/public/range-rollkit/alert-events.png)

🎊 Congrats! You've detected the first monitored transaction in your GM rollup.
