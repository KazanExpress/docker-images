FROM docker.io/library/alpine:3.16

RUN apk add --no-cache bash curl jq

COPY /shell-exp /opt/shell-exp

WORKDIR /opt/shell-exp

ENTRYPOINT ./shell-exporter --port 9600 --f /opt/shell-exp/metrics

EXPOSE 9600
