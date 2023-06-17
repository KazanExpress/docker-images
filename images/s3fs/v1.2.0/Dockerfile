# Multi-stage build
FROM alpine:3.16 AS build

LABEL maintainer="Yuriy Gavrilin <yuriy@kazanexpress.ru>"

ARG S3FS_VERSION=v1.86

# Install s3fs-s3fs
RUN apk --no-cache add \
    alpine-sdk=1.0-r1 \
    autoconf=2.71-r0 \ 
    automake=1.16.5-r0 \
    build-base=0.5-r3 \
    ca-certificates=20230506-r0 \
    curl-dev=8.1.2-r0 \
    fuse-dev=2.9.9-r1 \
    git=2.36.6-r0 \
    libcurl=8.1.2-r0 \
    libressl-dev=3.5.3-r0 \
    libxml2-dev=2.9.14-r0 && \
    git clone https://github.com/s3fs-fuse/s3fs-fuse.git

WORKDIR /s3fs-fuse

RUN git checkout tags/${S3FS_VERSION} && \
  ./autogen.sh && \
  ./configure --prefix=/usr && \
  make -j && \
  make install


FROM alpine:3.16

ENV AWS_S3_URL='http://storage.yandexcloud.net'
ENV AWS_S3_BUCKET='default'

# User and group ID of share owner
ENV UID=1000
ENV GID=1000

# Location of directory where to mount the drive into the container.
ENV AWS_S3_MOUNT=/opt/s3fs/$AWS_S3_BUCKET

# s3fs tuning
ENV S3FS_DEBUG=0
#ENV S3FS_ARGS='use_cache=/tmp,max_stat_cache_size=1000,stat_cache_expire=900,retries=5,connect_timeout=10'

COPY --from=build /usr/bin/s3fs /usr/bin/s3fs

RUN mkdir /opt/s3fs && \
    apk --no-cache add \
      ca-certificates=20211220-r0 \
      fuse=2.9.9-r1 \
      libcurl=7.83.1-r1 \
      libgcc=11.2.1_git20220219-r2 \
      libstdc++=11.2.1_git20220219-r2 \
      libxml2=2.9.14-r0 \
      tini=0.19.0-r0 && \
    s3fs --version

# allow access to volume by different user to enable UIDs other than root when using volumes
RUN echo user_allow_other >> /etc/fuse.conf

COPY *.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh /usr/local/bin/empty.sh /usr/local/bin/trap.sh

WORKDIR /opt/s3fs

# Following should match the AWS_S3_MOUNT environment variable.
VOLUME [ "/opt/s3fs/$AWS_S3_BUCKET" ]

# The default is to perform all system-level mounting as part of the entrypoint
# to then have a command that will keep listing the files under the main share.
# Listing the files will keep the share active and avoid that the remote server
# closes the connection.

ENTRYPOINT [ "tini", "-g", "--", "docker-entrypoint.sh" ]
CMD [ "empty.sh" ]
