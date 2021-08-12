FROM python:3-alpine

WORKDIR /app

# add dependincies
RUN apk add --update -t --no-cache git curl alpine-sdk

RUN pip install --no-cache-dir "commitizen==2.17.13"

CMD ["cz", "version"]
