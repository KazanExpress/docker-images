FROM alpine/terragrunt:1.1.9 as builder
RUN apk add --no-cache bash curl
RUN curl https://storage.yandexcloud.net/yandexcloud-yc/install.sh > /install.sh
RUN /bin/bash /install.sh


FROM ghcr.io/kazanexpress/tf-toolbox:v0.1.1 as toolbox


FROM alpine/terragrunt:1.1.9
COPY --from=builder /root/yandex-cloud/bin/yc /bin/yc
COPY --from=toolbox /app /bin
RUN apk add --no-cache ansible curl jq
