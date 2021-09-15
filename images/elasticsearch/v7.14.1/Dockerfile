ARG ELASTICSEARCH_TAG=7.14.1
FROM docker.elastic.co/elasticsearch/elasticsearch:${ELASTICSEARCH_TAG}

COPY config/hunspell /usr/share/elasticsearch/config/hunspell
COPY config/data /usr/share/elasticsearch/config/data
