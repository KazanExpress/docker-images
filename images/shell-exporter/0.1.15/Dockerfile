FROM docker.io/library/debian:stable-slim

USER root

COPY shell-exp/shell-exporter /usr/bin/

RUN apt-get update && apt-get -y --no-install-recommends install "curl=7.74.0-1.3+deb11u3" "jq=1.6-2.1" "ca-certificates=20210119" && apt-get clean && rm -rf /var/lib/apt/lists/*; chmod +x /usr/bin/shell-exporter ; useradd -u 8877 shell-exporter; mkdir /opt/metrics; chown shell-exporter:shell-exporter /opt/metrics 

USER shell-exporter

CMD ["bash", "-c","ln -s /opt/metrics_cm/*.sh /opt/metrics"]

ENTRYPOINT [ "bash", "-c", "/usr/bin/shell-exporter --port 9600 --f /opt/metrics" ]