# FROM curlimages/curl:7.78.0 as cert-downloader

FROM debezium/connect-base:1.6

# image adopted from https://github.com/debezium/docker-images/blob/master/connect/1.6/Dockerfile

LABEL maintainer="Debezium Community"

ENV DEBEZIUM_VERSION="1.6.2.Final" \
    MAVEN_REPO_CENTRAL="" \
    MAVEN_REPOS_ADDITIONAL="" \
    MAVEN_DEP_DESTINATION=$KAFKA_CONNECT_PLUGINS_DIR \
    POSTGRES_MD5=238d0f141e19f0e126b78e1802fef3d0 \
    CERT_DIR="/usr/local/share/ca-certificates/Yandex" \
    CERT_URL="https://storage.yandexcloud.net/cloud-certs/CA.pem" \
    KEYTOOL_PASS="kepass" \
    TRUSTSTORE_FILE="client.truststore.jks"

ENV CERT_FILE_PATH=$CERT_DIR"/YandexCA.crt"

USER root

# https://stackoverflow.com/a/67815258/3443964
# hadolint ignore=DL4006
RUN touch /etc/sysconfig/64bit_strstr_via_64bit_strstr_sse2_unaligned && \
    docker-maven-download debezium postgres "$DEBEZIUM_VERSION" "$POSTGRES_MD5" && \
    mkdir -p $CERT_DIR && \
    curl $CERT_URL -o $CERT_FILE_PATH && \
    echo Yes | keytool -keystore $TRUSTSTORE_FILE -storepass $KEYTOOL_PASS -alias CARoot -import -file $CERT_FILE_PATH && \
    cp $TRUSTSTORE_FILE /etc/security/ssl

USER kafka

COPY docker-entrypoint.sh /docker-entrypoint.sh