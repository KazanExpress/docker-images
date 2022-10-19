FROM docker.io/library/debian:stable-slim

USER root

RUN apt-get update && apt-get -y --no-install-recommends install "curl=7.74.0-1.3+deb11u3" "jq=1.6-2.1" "ca-certificates=20210119" && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY shell-exp/shell-exporter /usr/bin/ 

RUN chmod +x /usr/bin/shell-exporter

RUN useradd -u 8877 shell-exporter

USER shell-exporter

RUN mkdir /opt/metrics

ENTRYPOINT [ "bash", "-c", "/usr/bin/shell-exporter --port 9600 --f /opt/metrics" ]