FROM ghcr.io/kazanexpress/tf-toolbox:0.1.1 as toolbox

FROM alpine/terragrunt:1.1.9 as builder
RUN apk add --no-cache "bash>=5.1.15" "curl=>7.80.0" && \
    curl https://storage.yandexcloud.net/yandexcloud-yc/install.sh > /install.sh && \
    /bin/bash /install.sh

FROM hashicorp/terraform:1.1.9
ARG TERRAGRUNT=v0.36.12

ADD https://github.com/gruntwork-io/terragrunt/releases/download/${TERRAGRUNT}/terragrunt_linux_amd64 /usr/local/bin/terragrunt

RUN apk add --update --no-cache "bash>=5.1.15" "git>=2.34.2" "openssh>=8.8" "jq>=1.6-r1" "curl>=7.80.0" "ansible>=4.8.0" \
    && chmod +x /usr/local/bin/terragrunt

COPY --from=builder /root/yandex-cloud/bin/yc /bin/yc
COPY --from=toolbox /app /bin
WORKDIR /drone/src
