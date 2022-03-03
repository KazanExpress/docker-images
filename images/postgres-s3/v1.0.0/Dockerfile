FROM alpine

RUN apk --no-cache add postgresql-client py-pip ca-certificates && pip install s3cmd
ADD ./template.s3cfg /root/.s3cfg

WORKDIR /srv

CMD ["/bin/sh"]