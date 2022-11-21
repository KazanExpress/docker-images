FROM python:3.11
ENV PYTHONUNBUFFERED 1

RUN apt-get update -y  \
    && apt-get install -y --no-install-recommends gcc git libssl-dev g++ make  \
    && cd /tmp && git clone https://github.com/edenhill/librdkafka.git  \
    && cd librdkafka  \
    && ./configure --prefix=/usr  \
    && make  \
    && make install