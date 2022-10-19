FROM docker.io/library/debian:stable-slim

RUN apt-get update && apt-get -y --no-install-recommends install "curl=>7.70.0" "jq=>1.5" && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN mkdir /opt/metrics

COPY shell-exp/shell-exporter /usr/bin/ 

RUN chmod +x /usr/bin/shell-exporter

ENTRYPOINT [ "bash", "-c", "/usr/bin/shell-exporter --port 9600 --f /opt/metrics" ]