FROM alpine/terragrunt:1.1.9 as builder
RUN apk add --no-cache bash=5.1.16-r0 curl=7.80.0-r1 && \
    curl https://storage.yandexcloud.net/yandexcloud-yc/install.sh > /install.sh && \
    /bin/bash /install.sh

FROM ghcr.io/kazanexpress/tf-toolbox:0.1.1 as toolbox

FROM alpine/terragrunt:1.1.9
RUN apk add --no-cache ansible=4.8.0-r0 curl=7.80.0-r1 jq=1.6-r1
COPY --from=builder /root/yandex-cloud/bin/yc /bin/yc
COPY --from=toolbox /app /bin
