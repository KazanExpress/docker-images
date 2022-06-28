FROM golang:1.13-alpine AS build

RUN apk add --no-cache \
    gcc=9.3.0-r2 \
    git=2.26.3-r1 \
    make=4.3-r0 \
    musl-dev=1.1.24-r10 \
    zstd-dev=1.4.9-r0 \
    zstd-static=1.4.9-r0 \
    && \
    go get golang.org/x/lint/golint && \
    mkdir -p /go/src/github.com/Vertamedia/chproxy
WORKDIR /go/src/github.com/Vertamedia/chproxy
COPY ./sources ./
RUN make release-build


FROM alpine:3.16.0
COPY --from=build /go/src/github.com/Vertamedia/chproxy/chproxy /chproxy
ENTRYPOINT [ "/chproxy" ]
CMD [ "--help" ]
