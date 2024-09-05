FROM golang:1.22.5-bullseye

RUN set -eux; apt-get update && apt-get install git make;

WORKDIR /code
COPY . /code/

RUN WASMVM_VERSION=$(cat go.mod | grep github.com/CosmWasm/wasmvm | awk '\''{print $2}'\'') \
    && wget https://github.com/CosmWasm/wasmvm/releases/download/$WASMVM_VERSION/libwasmvm_muslc.$(uname -m).a \
    -O /lib/libwasmvm_muslc.a
RUN LEDGER_ENABLED=false BUILD_TAGS=muslc LINK_STATICALLY=true make build \
    && cp /code/build/wasmd /usr/bin/wasmd

WORKDIR /opt

EXPOSE 1317
EXPOSE 36656
EXPOSE 36657