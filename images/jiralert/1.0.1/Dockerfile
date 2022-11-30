# hadolint ignore=DL3007
FROM quay.io/prometheus/busybox-linux-amd64:latest

COPY ./build/jiralert /bin/jiralert

ENTRYPOINT [ "/bin/jiralert" ]
