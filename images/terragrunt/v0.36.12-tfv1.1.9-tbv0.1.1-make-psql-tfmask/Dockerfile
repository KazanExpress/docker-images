FROM golang:1.17 AS tfmask
RUN mkdir /app

WORKDIR /app

RUN git clone https://github.com/KazanExpress/tfmask.git
WORKDIR /app/tfmask
RUN CGO_ENABLED=0 GOOS=$(go env GOHOSTOS) GOARCH=$(go env GOHOSTARCH) go build .

RUN cp ./tfmask /tfmask


FROM ghcr.io/kazanexpress/tf-toolbox:0.1.1 as toolbox

FROM alpine/terragrunt:1.1.9 as builder
RUN apk add --no-cache "bash>=5.1.15" "curl=>7.80.0" && \
    curl https://storage.yandexcloud.net/yandexcloud-yc/install.sh > /install.sh && \
    /bin/bash /install.sh

FROM hashicorp/terraform:1.1.9
ARG TERRAGRUNT=v0.36.12
ENV TFMASK_VALUES_REGEX="(?i)^.*[^a-zA-Z](oauth|secret|certificate|token|password|key|result).*$" \
    TF_CLI_ARGS="-no-color"

ADD https://github.com/gruntwork-io/terragrunt/releases/download/${TERRAGRUNT}/terragrunt_linux_amd64 /usr/local/bin/terragrunt
COPY --from=tfmask /tfmask /usr/local/bin/tfmask

RUN apk add --update --no-cache "bash>=5.1.15" "git>=2.34.2" "openssh>=8.8" "jq>=1.6-r1" "curl>=7.80.0" "ansible>=4.8.0" "make>=4.3-r0" "postgresql-client>=3.15" \
    && chmod +x /usr/local/bin/terragrunt && chmod +x /usr/local/bin/tfmask

COPY --from=builder /root/yandex-cloud/bin/yc /bin/yc
COPY --from=toolbox /app /bin
WORKDIR /drone/src
