FROM bitnami/kubectl:1.23.8-debian-11-r6 as kubectl


FROM alpine:3.16.0 as yc
RUN apk add --no-cache "bash>=5.1.16-r2" "curl>=7.83.1-r2" && \
    curl https://storage.yandexcloud.net/yandexcloud-yc/install.sh > /install.sh && \
    /bin/bash /install.sh


FROM alpine:3.16.0
RUN apk add --update --no-cache "bash>=5.1.16-r2" "jq>=1.6-r1" && \ 
    addgroup -S kubeyc && adduser -S kubeyc -G kubeyc
USER kubeyc
WORKDIR /home/kubeyc
COPY --from=kubectl /opt/bitnami/kubectl/bin/kubectl /bin/kubectl
COPY --from=yc /root/yandex-cloud/bin/yc /bin/yc
