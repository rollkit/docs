# Basic Rollup

## Description

The simplest way to build a Rollup. You delegate Aggregation to the DA-Layer. Every Rollup node has to replay all the transactions in the rollup in order to check and update to the newest state.

## Design

Here is an example of what this design could look like:

```mermaid
graph TB
  U["User"] --> T["Transaction"]
  T --> A["DA Layer"]
  
  A --> B["Ordered Batch"]
  B --> FN["Rollup Full Node"]

  style U stroke:currentColor, fill:#FFA07A
  style A stroke:currentColor, fill: #87CEFA
  style FN stroke:currentColor, fill:#98FB98
```

## Aggregation

The DA-Layer is the Aggregator. It does Inclusion and Ordering.

## Header Production

Each Full Node has to execute all transactions. There are no Light Nodes in this system so there is no need to produce a rollup header.

## Censorship Resistance

Based rollups enjoy the same censorship resistance as the DA-Layer.

## Liveness

Based rollups enjoys the same liveness guarantees as the DA-Layer (Based Rollups).

## Rollup Light Nodes

This design has no Rollup Light Nodes.

## Smallest Trust-Minimized Setup

DA-Layer Light Node + Rollup Full Node
