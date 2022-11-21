FROM docker.io/library/debian:stable-slim

COPY grok_exporter/ /opt/grok_exporter/

RUN chmod +x /opt/grok_exporter/grok_exporter 

ENTRYPOINT ["/opt/grok_exporter/grok_exporter", "-config", "/opt/grok_exporter/config.yaml"]
