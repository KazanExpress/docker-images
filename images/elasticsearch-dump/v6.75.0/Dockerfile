ARG ES_DUMP_TAG=v6.75.0
FROM elasticdump/elasticsearch-dump:${ES_DUMP_TAG}

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
    ca-certificates=20200601~deb10u2 \
    curl=7.64.0-4+deb10u2 \
    jq=1.5+dfsg-2+b1 \
    unzip=6.0-23+deb10u2 && \
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install &&\
    rm -rf /var/lib/apt/ /var/cache/ awscliv2*
