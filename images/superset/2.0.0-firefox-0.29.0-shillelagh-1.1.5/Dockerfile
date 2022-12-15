FROM apache/superset:2.0.0

LABEL maintainer="Yuriy Gavrilin <yuriy@kazanexpress.ru>"

USER root
RUN apt-get update && \
    apt-get install --no-install-recommends -y firefox-esr=91.13.0esr-1~deb11u1 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENV GECKODRIVER_VERSION=0.29.0
RUN wget -q https://github.com/mozilla/geckodriver/releases/download/v${GECKODRIVER_VERSION}/geckodriver-v${GECKODRIVER_VERSION}-linux64.tar.gz && \
    tar -x geckodriver -zf geckodriver-v${GECKODRIVER_VERSION}-linux64.tar.gz -O > /usr/bin/geckodriver && \
    chmod 755 /usr/bin/geckodriver && \
    rm geckodriver-v${GECKODRIVER_VERSION}-linux64.tar.gz

RUN pip install --no-cache --no-cache-dir gevent~=22.10 psycopg2~=2.9 redis~=4.4 clickhouse-connect~=0.4 Authlib~=1.2 shillelagh[all]==1.1.5

USER superset
