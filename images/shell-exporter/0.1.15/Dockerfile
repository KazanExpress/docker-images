FROM docker.io/library/alpine:3.16

RUN apk add --no-cache "bash>=5.1.15" "curl=>7.80.0" "jq=>1.5"

COPY shell-exp/shell-exporter /usr/bin/ 

CMD ["chmod +x /usr/bin/shell-exporter"]

ENTRYPOINT [ "bash", "-c", "shell-exporter --port 9600 --f /opt/metrics" ]