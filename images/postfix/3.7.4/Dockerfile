FROM alpine

EXPOSE 25/tcp

# TODO: FIX VERSIONS
RUN apk --no-cache add ca-certificates libintl=0.21.1-r1 postfix=3.7.4-r0 tzdata

ENTRYPOINT ["/entrypoint.sh"]

COPY entrypoint.sh /
