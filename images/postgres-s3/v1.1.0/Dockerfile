FROM golang:alpine3.15

RUN addgroup -g 1000 -S backup && \
    adduser -u 1000 -S backup -G backup && \
    apk --no-cache add \
    ca-certificates=20211220-r0 \
    postgresql14-client=14.4-r0 \
    py3-pip=20.3.4-r1

RUN go install github.com/minio/mc@latest

USER backup
WORKDIR /workspace

CMD ["/bin/sh"]
