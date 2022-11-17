FROM docker.io/library/debian:stable-slim

COPY grok_exporter/ /opt/grok_exporter/

RUN chmod +x /opt/grok_exporter/grok_exporter 

RUN addgroup --system --gid 1002 grok_exporter && adduser --system --uid 1002 --group grok_exporter

RUN chown -R grok_exporter:grok_exporter /var/ /run /opt /tmp

USER grok_exporter

ENTRYPOINT ["/opt/grok_exporter/grok_exporter", "-config", "/opt/grok_exporter/config.yaml"]



