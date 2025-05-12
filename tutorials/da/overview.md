---
description: This page provides an overview of how rollkit integrates with DA.
---

<!-- markdownlint-disable MD033 -->

# DA

Now that you have the foundations of running and building a rollup with Rollkit, it is time to start customizing it to fit your needs.

The first choice you need to make is which data availability (DA) layer to use. The DA layer is a critical component of a blockchain, as it provides the data availability and finality guarantees that your chain needs to operate securely.

Rollkit uses the [go-da interface](https://github.com/rollkit/go-da) to communicate to DA layers. Any DA layer that implements this interface can be used with Rollkit.

## Go DA {#go-da}

The [go-da interface](https://github.com/rollkit/go-da) defines the core functions required to interact with a DA layer. Probably the two most important functions being `Get` and `Submit`.

```go
// DA defines very generic interface for interaction with Data Availability layers.
type DA interface {
 // Get returns Blob for each given ID, or an error.
 Get(ctx context.Context, ids []ID, namespace Namespace) ([]Blob, error)

 // Submit submits the Blobs to Data Availability layer.
 Submit(ctx context.Context, blobs []Blob, gasPrice float64, namespace Namespace) ([]ID, error)
}
```

DA layers can integrate the `go-da` interface directly into their node like [Celestia](celestia-da), or they can define a middleware service like [Avail](avail-da).

## Mock DA {#mock-da}

You might have noticed that we did not define any DA layer during the [quick start](../quick-start.md) or [build a chain](../wordle.md) tutorials. This is because we used a mock DA layer that is built into Rollkit.

If you revisit the logs from those tutorials, you will see one of the first lines being:

```shell
I[2024-11-15|14:09:41.735] Starting mock DA server                      module=main address=http://localhost:26658
```

The mock DA layer is a simple in-memory DA layer that is great for testing and development. It is not suitable for production use, as it does not provide the data availability and finality guarantees that a real DA layer would.

## DA Layers {#da-layers}

Now that you have a better understanding of what a DA layer is, you can start to explore the different DA layers that are available to use with Rollkit.

* [Local DA](local-da.md)
* [Celestia DA](celestia-da.md)
