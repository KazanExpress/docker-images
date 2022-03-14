FROM golang:alpine3.15

RUN addgroup -g 1000 -S backup && \
    adduser -u 1000 -S backup -G backup && \
    apk --no-cache add postgresql-client py-pip ca-certificates

RUN go install github.com/minio/mc@latest

USER backup
WORKDIR /workspace

CMD ["/bin/sh"]