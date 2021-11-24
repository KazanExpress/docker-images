ARG ES_VERSION=7.13.3
FROM docker.elastic.co/elasticsearch/elasticsearch:${ES_VERSION}

COPY config/hunspell /usr/share/elasticsearch/config/hunspell
COPY config/data /usr/share/elasticsearch/config/data
