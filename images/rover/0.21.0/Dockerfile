FROM debian:stable-slim as installer

ENV ROVER_VERSION="0.21.0"

# install script needs curl or wget
RUN apt-get update && apt-get install -y --no-install-recommends curl

RUN curl -sSL https://rover.apollo.dev/nix/v${ROVER_VERSION} | sh

FROM debian:stable-slim as runner

COPY --from=installer /root/.rover/bin/rover /root/.rover/bin/rover
ENV PATH="/root/.rover/bin:${PATH}"

# We also need ca-certificates to trust certs
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/* && apt-get clean

ENTRYPOINT [ "/root/.rover/bin/rover" ]
