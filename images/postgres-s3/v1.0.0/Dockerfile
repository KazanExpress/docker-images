FROM alpine:3.15

RUN addgroup -S backup && adduser -S backup -G backup && \
    apk --no-cache add postgresql-client py-pip ca-certificates && pip install s3cmd

USER backup
WORKDIR /workspace
ADD template.s3cfg /home/backup/.s3cfg

CMD ["/bin/sh"]