---
description: This page provides an overview of how rollkit integrates with DA.
---

<!-- markdownlint-disable MD033 -->

# DA

Now that you have the foundations of running and building a rollup with Rollkit, it is time to start customizing it to fit your needs.

The first choice you need to make is which data availability (DA) layer to use. The DA layer is a critical component of a blockchain, as it provides the data availability and finality guarantees that your chain needs to operate securely.

Rollkit uses the [core da interface](https://github.com/rollkit/rollkit/blob/main/core/da/da.go#L11) to communicate to DA layers. Any DA layer that implements this interface can be used with Rollkit.

## DA {#go-da}

The [DA interface](https://github.com/rollkit/rollkit/blob/main/core/da/da.go#L11) defines the core functions required to interact with a DA layer. Probably the two most important functions being `Get` and `Submit`.

```go
// DA defines very generic interface for interaction with Data Availability layers.
type DA interface {
 // Get returns Blob for each given ID, or an error.
 //
 // Error should be returned if ID is not formatted properly, there is no Blob for given ID or any other client-level
 // error occurred (dropped connection, timeout, etc).
 Get(ctx context.Context, ids []ID, namespace []byte) ([]Blob, error)

 // GetIDs returns IDs of all Blobs located in DA at given height.
 GetIDs(ctx context.Context, height uint64, namespace []byte) (*GetIDsResult, error)

 // GetProofs returns inclusion Proofs for Blobs specified by their IDs.
 GetProofs(ctx context.Context, ids []ID, namespace []byte) ([]Proof, error)

 // Commit creates a Commitment for each given Blob.
 Commit(ctx context.Context, blobs []Blob, namespace []byte) ([]Commitment, error)

 // Submit submits the Blobs to Data Availability layer.
 //
 // This method is synchronous. Upon successful submission to Data Availability layer, it returns the IDs identifying blobs
 // in DA.
 Submit(ctx context.Context, blobs []Blob, gasPrice float64, namespace []byte) ([]ID, error)

 // SubmitWithOptions submits the Blobs to Data Availability layer with additional options.
 SubmitWithOptions(ctx context.Context, blobs []Blob, gasPrice float64, namespace []byte, options []byte) ([]ID, error)

 // Validate validates Commitments against the corresponding Proofs. This should be possible without retrieving the Blobs.
 Validate(ctx context.Context, ids []ID, proofs []Proof, namespace []byte) ([]bool, error)

 // GasPrice returns the gas price for the DA layer.
 GasPrice(ctx context.Context) (float64, error)

 // GasMultiplier returns the gas multiplier for the DA layer.
 GasMultiplier(ctx context.Context) (float64, error)
}
```

 DA layers can integrate the `DA` interface directly into their node like [Celestia DA](celestia-da.md).

## Mock DA {#mock-da}

You might have noticed that we did not define any DA layer during the [quick start](/tutorials/quick-start.md) or [build a chain](/tutorials/gm-world.md) tutorials. This is because we used a mock DA layer that is built into Rollkit.

If you revisit the logs from those tutorials, you will see one of the first lines being:

```shell
I[2024-11-15|14:09:41.735] Starting mock DA server                      module=main address=http://localhost:26658
```

The mock DA layer is a simple in-memory DA layer that is great for testing and development. It is not suitable for production use, as it does not provide the data availability and finality guarantees that a real DA layer would.

## DA Layers {#da-layers}

Now that you have a better understanding of what a DA layer is, you can start to explore the different DA layers that are available to use with Rollkit.

* [Local DA](/tutorials/da/local-da.md)
* [Celestia DA](/tutorials/da/celestia-da.md)
