FROM quay.io/strimzi/kafka:0.27.0-kafka-3.0.0
LABEL maintener="KazanExpress analytics"
ARG CERT_DIR="/usr/local/share/ca-certificates/Yandex"
ARG CERT_URL="https://storage.yandexcloud.net/cloud-certs/CA.pem"
ARG CERT_FILE_PATH=$CERT_DIR"/YandexCA.crt"
ARG KEYTOOL_PASS="kepass"
ARG TRUSTSTORE_FILE="client.truststore.jks"
ARG KAFKA_CONNECT_PLUGINS_DIR="/usr/share/java"
ARG POSTGRES_PLUGIN_MAVEN_URL="https://repo1.maven.org/maven2/io/debezium/debezium-connector-postgres/1.3.1.Final/debezium-connector-postgres-1.3.1.Final-plugin.tar.gz"
ENV DEBEZIUM_VERSION="1.8.0.Final" \
    MAVEN_REPO_CENTRAL="" \
    MAVEN_REPOS_ADDITIONAL="" \
    MAVEN_DEP_DESTINATION=$KAFKA_CONNECT_PLUGINS_DIR \
    POSTGRES_MD5=02a489aa11424cd8233bac98f0da702e
USER root
RUN mkdir -p $CERT_DIR && \
    curl $CERT_URL --output $CERT_FILE_PATH
RUN echo Yes | keytool -keystore $TRUSTSTORE_FILE -storepass $KEYTOOL_PASS -alias CARoot -import -file $CERT_FILE_PATH
RUN cp $TRUSTSTORE_FILE /etc/security/ssl
RUN mkdir -p $KAFKA_CONNECT_PLUGINS_DIR
EXPOSE 8083