ARG ES_VERSION=8.6.2
FROM docker.elastic.co/elasticsearch/elasticsearch:${ES_VERSION}

ARG ES_VERSION=8.6.2

# install jmorphy2
RUN elasticsearch-plugin install --batch \
  https://github.com/o19s/elasticsearch-learning-to-rank/releases/download/v1.5.8-es8.6.2/ltr-plugin-v1.5.8-es8.6.2.zip && \
  # install s3 plugin
  elasticsearch-plugin install --batch repository-s3 

COPY config/hunspell /usr/share/elasticsearch/config/hunspell
