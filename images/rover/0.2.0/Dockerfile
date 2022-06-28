FROM node:16-buster-slim

ENV ROVER_VERSION="0.2.0"

RUN set -ex; \
    apt-get update; \
    apt-get install -y --no-install-recommends ca-certificates=20200601~deb10u2; \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g @apollo/rover@${ROVER_VERSION}

ENTRYPOINT ["rover"]
