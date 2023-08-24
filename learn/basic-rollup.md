# Basic Rollup

## Description

The User submits a transaction to the Aggregator. After Aggregation, the Rollup Full Node can use the Batch and apply the changes to the state.

During the Header Production, the Header is generated with some security grantees. The Rollup Light Node can consume the Header and validate those security guarantees.

## Diagram

Here is an example of what this design could look like:

```mermaid
graph TB
  U["User"] --> T["Transaction"]
  T --> A["Aggregator"]
  
  A --> B["Batch"]
  B --> HP["Header Producer"]
  B --> FN["Rollup Full Node"]
  
  HP --> H["Header+"]
  H --> LN["Rollup Light Node"]

  style U stroke:currentColor, fill:#FFA07A
  style FN stroke:currentColor, fill:#98FB98
  style LN stroke:currentColor, fill:#D8BFD8
  style A stroke:currentColor, fill: #87CEFA
  style HP stroke:currentColor, fill:#FA8072
```

## Aggregation

TBD

## Header Production

TBD

## Censorship Resistance

TBD

## Liveness

TBD

## Rollup Light Nodes

TBD

## Smallest Trust-Minimized Setup

TBD
