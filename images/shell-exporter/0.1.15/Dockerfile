FROM docker.io/library/alpine:3.16

RUN apk add --no-cache "bash>=5.1.15" "curl=>7.80.0" "jq=>1.5"

COPY /shell-exp /opt/shell-exp

WORKDIR /opt/shell-exp

CMD [ "bash", "-c", "./shell-exporter --port 9600 --f /opt/shell-exp/metrics" ]