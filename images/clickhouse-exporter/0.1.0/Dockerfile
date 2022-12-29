FROM golang:1.16 AS BUILD

COPY . /go/src/github.com/ClickHouse/clickhouse_exporter

WORKDIR /go/src/github.com/ClickHouse/clickhouse_exporter

RUN make init && make


FROM alpine:3.17

COPY --from=BUILD /go/bin/clickhouse_exporter /usr/local/bin/clickhouse_exporter
RUN apk update && apk add ca-certificates=20220614-r3 --no-cache && rm -rf /var/cache/apk/*

RUN adduser -D clickhouse-exporter

USER clickhouse-exporter

ENV CLICKHOUSE_USER="user"
ENV CLICKHOUSE_PASSWORD="password"
ENV SCRAPE_URI="http://localhost:8123/"

ENTRYPOINT ["/usr/local/bin/clickhouse_exporter"]