FROM golang:1.18 AS build
RUN mkdir /app

WORKDIR /app

RUN git clone --depth 1 --branch v0.8.1 https://github.com/ozontech/file.d.git
WORKDIR /app/file.d
RUN CGO_ENABLED=0 GOOS=$(go env GOHOSTOS) GOARCH=$(go env GOHOSTARCH) go build ./cmd

RUN cp ./file.d /file.d


FROM alpine:3.15.0

COPY --from=build /file.d /bin/file.d

ENTRYPOINT [ "file.d" ]
