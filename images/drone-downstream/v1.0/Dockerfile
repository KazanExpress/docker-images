FROM plugins/downstream@sha256:43867f4273432cba6b6dec8e508cdf36c518dad17c3412c771e0404ae51db6ec as base

FROM alpine:3.17

RUN apk add --no-cache "bash>=5.1.16-r2"

COPY --from=base /bin/drone-downstream /bin/drone-downstream

ENTRYPOINT [ "/bin/drone-downstream" ]
