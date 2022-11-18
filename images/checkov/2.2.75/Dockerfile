FROM bridgecrew/checkov:2.2.75

ARG TERRAGRUNT=v0.36.12
ARG TERRAFORM=1.3.2

ADD https://releases.hashicorp.com/terraform/${TERRAFORM}/terraform_${TERRAFORM}_linux_amd64.zip /tmp/terraform.zip

ADD https://github.com/gruntwork-io/terragrunt/releases/download/${TERRAGRUNT}/terragrunt_linux_amd64 /usr/local/bin/terragrunt

# hadolint ignore=SC2261
RUN apt-get update && \
    apt-get install -y --no-install-recommends git=1:2.30.2-1 jq=1.6-2.1 curl=7.74.0-1.3+deb11u3 unzip=6.0-26+deb11u1 && \
    chmod +x /usr/local/bin/terragrunt && \
    unzip /tmp/terraform.zip -d /usr/local/bin && chmod +x /usr/local/bin/terraform && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /drone/src
