FROM alpine
RUN apk --no-cache add postgresql-client py-pip ca-certificates && pip install s3cmd
WORKDIR /srv
CMD ["/bin/sh"]