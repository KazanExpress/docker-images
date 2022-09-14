ARG GOLANG_IMAGE="golang:1.17"
# hadolint ignore=DL3006
FROM ${GOLANG_IMAGE} AS build
RUN mkdir /app

WORKDIR /app

RUN git clone https://github.com/KazanExpress/drone-downstream.git
WORKDIR /app/drone-downstream
RUN CGO_ENABLED=0 GOOS=$(go env GOHOSTOS) GOARCH=$(go env GOHOSTARCH) go build ./cmd/drone-downstream

RUN cp ./drone-downstream /drone-downstream


FROM alpine:3.15.0

COPY --from=build /drone-downstream /usr/bin/drone-downstream

ENTRYPOINT [ "drone-downstream" ]
