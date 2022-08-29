FROM node:18.8-alpine3.15

WORKDIR /app

COPY . ./

RUN mkdir /config && npm install

VOLUME [ "/config" ]

CMD npm start
