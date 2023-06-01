FROM alpine:3

RUN addgroup -S backup && adduser -S backup -G backup && \
    apk --no-cache add \
    "ca-certificates>=20211220-r0" \
    "postgresql14-client>=14.4-r0" \
    "py3-pip>=22.1.1-r0"

RUN pip install --no-cache-dir s3cmd==2.2.0

USER backup
WORKDIR /workspace
COPY template.s3cfg /home/backup/.s3cfg

CMD ["/bin/sh"]
