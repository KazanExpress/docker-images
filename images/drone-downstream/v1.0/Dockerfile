FROM plugins/downstream@sha256:3cb2945655ad5ae1459b29fa530c7791ad865a85908d2a77e34b39f84934303c as base

FROM alpine:3.16

RUN apk add --no-cache "bash>=5.1.16-r2"

COPY --from=base /bin/drone-downstream /bin/drone-downstream

ENTRYPOINT [ "/bin/drone-downstream" ]
