ARG ES_DUMP_TAG=v6.74.0
FROM elasticdump/elasticsearch-dump:${ES_DUMP_TAG}

RUN apt-get update -y && \
    apt-get install curl=7.64.0-4+deb10u2 -y --no-install-recommends && \
    rm -rf /var/lib/apt/ && rm -rf /var/cache/
