FROM alpine:3.15.4 as base
RUN apk add --no-cache curl bash jq && \
    curl https://storage.yandexcloud.net/yandexcloud-yc/install.sh > /install.sh && \
    /bin/bash /install.sh

FROM alpine:3.15.4
RUN apk add --no-cache jq bash && \
    adduser --disabled-password app -s /bin/sh -h /home/app
WORKDIR /home/app
USER app
COPY --chown=app:app docker-entrypoint.sh docker-entrypoint.sh
COPY --from=base --chown=app:app /root/yandex-cloud/bin/yc /bin/yc
ENTRYPOINT [ "bash", "docker-entrypoint.sh" ]
