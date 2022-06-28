FROM alpine/terragrunt:1.0.6 as builder
RUN apk add --no-cache bash=5.1.4-r0 curl=7.79.1-r1 && \
    curl https://storage.yandexcloud.net/yandexcloud-yc/install.sh > /install.sh && \
    /bin/bash /install.sh

FROM alpine/terragrunt:1.0.6
RUN apk add --no-cache ansible=2.10.7-r0 curl=7.79.1-r1
COPY --from=builder /root/yandex-cloud/bin/yc /bin/yc
