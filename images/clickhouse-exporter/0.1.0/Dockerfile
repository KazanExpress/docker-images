FROM golang:1.16 AS BUILD

RUN mkdir /app

WORKDIR /app

RUN git clone --branch master  https://github.com/KazanExpress/clickhouse_exporter.git

WORKDIR /app/clickhouse_exporter

RUN make init && make

FROM frolvlad/alpine-glibc:alpine-3.17

COPY --from=BUILD /go/bin/clickhouse_exporter /usr/local/bin/clickhouse_exporter
RUN apk update && apk add ca-certificates=20220614-r4 --no-cache && rm -rf /var/cache/apk/*


RUN adduser -D clickhouse-exporter

USER clickhouse-exporter

ENV CLICKHOUSE_USER="user"
ENV CLICKHOUSE_PASSWORD="passwd"
ENV SCRAPE_URI="http://localhost:8123/"

ENTRYPOINT ["/usr/local/bin/clickhouse_exporter"]

