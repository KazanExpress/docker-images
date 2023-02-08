FROM alpine:3.17.1

EXPOSE 25/tcp

RUN apk --no-cache add ca-certificates=20220614-r4 libintl=0.21.1-r1 postfix=3.7.4-r0 tzdata=2022f-r1

ENTRYPOINT ["/entrypoint.sh"]

COPY entrypoint.sh /
