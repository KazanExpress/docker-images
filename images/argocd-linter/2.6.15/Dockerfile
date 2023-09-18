FROM argoproj/argocd:v2.6.15

ADD https://github.com/argoproj-labs/argocd-vault-plugin/releases/download/v1.16.1/argocd-vault-plugin_1.16.1_linux_amd64 /bin/argocd-vault-plugin

ADD https://github.com/KazanExpress/argocd-terraform-plugin/releases/download/v0.1.1/argocd-terraform-plugin_0.1.1_linux_amd64 /bin/argocd-terraform-plugin

USER root
RUN apt-get update && \
    apt-get install -y --no-install-recommends \ 
    curl \ 
    jq && \
    rm -rf /var/lib/apt/lists/* && \
    chmod +x /bin/argocd-terraform-plugin && \
    chmod +x /bin/argocd-vault-plugin

USER 999
