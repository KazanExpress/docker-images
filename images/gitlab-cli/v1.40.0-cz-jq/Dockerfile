FROM python:3-alpine3.19

ENV GITLAB_CLI_VERSION="1.40.0"
ENV COMMITIZEN_VERSION="3.24.0"

WORKDIR /app

RUN apk add --update -t --no-cache git curl alpine-sdk perl-utils jq
RUN ["pip", "install", "-U", "--no-cache-dir", "pip"]

RUN pip install --no-cache-dir commitizen==$COMMITIZEN_VERSION

RUN set -ex && \
    curl -L "https://gitlab.com/gitlab-org/cli/-/releases/v${GITLAB_CLI_VERSION}/downloads/checksums.txt" -o checksums.txt && \
    curl -OL "https://gitlab.com/gitlab-org/cli/-/releases/v${GITLAB_CLI_VERSION}/downloads/glab_${GITLAB_CLI_VERSION}_Linux_x86_64.apk" && \
    cat checksums.txt && \
    shasum --ignore-missing -a 512 -c checksums.txt && \
    apk add --allow-untrusted --no-cache "glab_${GITLAB_CLI_VERSION}_Linux_x86_64.apk" && \
    rm -rf "glab_${GITLAB_CLI_VERSION}_Linux_x86_64.apk"

CMD ["glab", "--version"]