FROM python:3-alpine3.19

ENV GITLAB_CLI_VERSION="1.40.0"
ENV COMMITIZEN_VERSION="3.24.0"

WORKDIR /app

## See https://pkgs.alpinelinux.org/packages?branch=v3.19&repo=main&arch=x86_64
RUN set -ex && \
    apk add --update -t --no-cache git==2.43.0-r0 curl==8.5.0-r0 alpine-sdk==1.0-r1 perl-utils==5.38.2-r0 jq==1.7.1-r0 && \
    pip install -U --no-cache-dir pip==24.0 commitizen==$COMMITIZEN_VERSION && \
    curl -L "https://gitlab.com/gitlab-org/cli/-/releases/v${GITLAB_CLI_VERSION}/downloads/checksums.txt" -o checksums.txt && \
    curl -OL "https://gitlab.com/gitlab-org/cli/-/releases/v${GITLAB_CLI_VERSION}/downloads/glab_${GITLAB_CLI_VERSION}_Linux_x86_64.apk" && \
    cat checksums.txt && \
    shasum --ignore-missing -a 512 -c checksums.txt && \
    apk add --allow-untrusted --no-cache "glab_${GITLAB_CLI_VERSION}_Linux_x86_64.apk" && \
    rm -rf "glab_${GITLAB_CLI_VERSION}_Linux_x86_64.apk"

CMD ["glab", "--version"]