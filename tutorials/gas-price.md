# How to configure gas price

In most cases the gas price can be left to the defaults, which ensures that the price
is greater than the minimum gas price accepted by the core node.

The gas price can also be configured manually with the flag `--rollkit.da_gas_price`:

```bash
gmd start --rollkit.da_gas_price=0.1 [existing flags...]
```

This configures the rollup to always use the fixed gas price of `0.1utia/gas`.

When running a rollup against a live network the gas price may see
occasional spikes during periods of high mempool congestion.

To avoid such transient blob submission failures, the flag `--rollkit.da_gas_multiplier` maybe used:

```bash
gmd start --rollkit.da_gas_multiplier=1.2 [existing flags...]
```

This configures the rollup to keep increasing the gas price by a factor of 1.2x of the previous price.

When the blob submission transaction eventually succeeds, the gas price will be gradually back to the default
by the same factor.
