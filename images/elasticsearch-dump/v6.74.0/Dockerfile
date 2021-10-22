ARG ES_DUMP_TAG=v6.74.0
FROM elasticdump/elasticsearch-dump:${ES_DUMP_TAG}

RUN apt update -y && \
    apt install curl -y && \
    rm -rf /var/lib/apt/ && rm -rf /var/cache/
