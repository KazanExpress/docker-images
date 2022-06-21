FROM alpine/terragrunt:1.1.4 as builder
RUN apk add --no-cache bash=5.1.8-r0 curl=7.80.0-r1 && \
    curl https://storage.yandexcloud.net/yandexcloud-yc/install.sh > /install.sh && \ 
    /bin/bash /install.sh

FROM alpine/terragrunt:1.1.4
RUN apk add --no-cache ansible=4.8.0-r0 curl=7.80.0-r1
COPY --from=builder /root/yandex-cloud/bin/yc /bin/yc
