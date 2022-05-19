FROM plugins/downstream as base

FROM alpine:3.15.4

RUN apk add --no-cache bash

COPY --from=base /bin/drone-downstream /bin/drone-downstream

ENTRYPOINT [ "/bin/drone-downstream" ]