FROM plugins/downstream:1.2.0 as base

FROM alpine:3.15.4

RUN apk add --no-cache bash=5.1.16-r0

COPY --from=base /bin/drone-downstream /bin/drone-downstream

ENTRYPOINT [ "/bin/drone-downstream" ]
