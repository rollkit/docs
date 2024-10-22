FROM golang:1.22.5-bullseye

RUN set -eux; apt-get update && apt-get install -y git make;

WORKDIR /code
COPY . /code/

RUN LEDGER_ENABLED=false make build
RUN cp /code/build/wasmd /usr/bin/wasmd

WORKDIR /opt

EXPOSE 1317
EXPOSE 36656
EXPOSE 36657