FROM alpine

EXPOSE 25/tcp

RUN apk --no-cache add ca-certificates libintl postfix tzdata

ENTRYPOINT ["/entrypoint.sh"]

COPY entrypoint.sh /

COPY relay_maps sasl_passwd /etc/postfix/

