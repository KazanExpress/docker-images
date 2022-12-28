FROM golang:1.16 AS BUILD

COPY . /go/src/github.com/ClickHouse/clickhouse_exporter

WORKDIR /go/src/github.com/ClickHouse/clickhouse_exporter

RUN make init && make


FROM frolvlad/alpine-glibc:alpine-3.13

COPY --from=BUILD /go/bin/clickhouse_exporter /usr/local/bin/clickhouse_exporter
RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*

RUN adduser -D clickhouse-exporter

USER clickhouse-exporter

ENV CLICKHOUSE_USER="user"
ENV CLICKHOUSE_PASSWORD="password"

ENTRYPOINT ["/usr/local/bin/clickhouse_exporter"]