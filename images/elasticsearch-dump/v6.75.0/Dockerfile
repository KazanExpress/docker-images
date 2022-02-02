ARG ES_DUMP_TAG=v6.75.0
FROM elasticdump/elasticsearch-dump:${ES_DUMP_TAG}

RUN apt update -y && \
    apt install unzip curl jq -y && \
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install &&\
    rm -rf /var/lib/apt/ /var/cache/ awscliv2*
    
