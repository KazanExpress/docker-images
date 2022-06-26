FROM contentsquareplatform/chproxy:1.15.1

RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates=20210119 && \
    rm -rf /var/lib/apt/lists/*
ADD "https://storage.yandexcloud.net/cloud-certs/CA.pem" /usr/local/share/ca-certificates/Yandex/YandexInternalRootCA.crt
RUN update-ca-certificates
ENTRYPOINT ["/chproxy"]
