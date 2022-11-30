FROM golang:1.19 AS builder
WORKDIR /go/src/github.com/prometheus-community/jiralert
COPY . /go/src/github.com/prometheus-community/jiralert
RUN GO111MODULE=on GOBIN=/tmp/bin make

# hadolint ignore=DL3007
FROM quay.io/prometheus/busybox-linux-amd64:latest

COPY --from=builder /go/src/github.com/prometheus-community/jiralert/jiralert /bin/jiralert

ENTRYPOINT [ "/bin/jiralert" ]
