FROM alpine/terragrunt:1.0.3 as builder
RUN apk add --no-cache bash curl
RUN curl https://storage.yandexcloud.net/yandexcloud-yc/install.sh > /install.sh
RUN /bin/bash /install.sh

FROM alpine/terragrunt:1.0.3
COPY --from=builder /root/yandex-cloud/bin/yc /bin/yc