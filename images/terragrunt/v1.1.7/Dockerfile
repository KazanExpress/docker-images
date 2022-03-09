FROM alpine/terragrunt:1.1.7 as builder
RUN apk add --no-cache bash curl
RUN curl https://storage.yandexcloud.net/yandexcloud-yc/install.sh > /install.sh
RUN /bin/bash /install.sh

FROM alpine/terragrunt:1.1.7
COPY --from=builder /root/yandex-cloud/bin/yc /bin/yc
RUN apk add --no-cache ansible curl
