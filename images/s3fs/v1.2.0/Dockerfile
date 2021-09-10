# Multi-stage build
FROM alpine AS build

LABEL maintainer="Yuriy Gavrilin <yuriy@kazanexpress.ru>"

ARG S3FS_VERSION=v1.86

# Install s3fs-s3fs
RUN apk --no-cache add \
    ca-certificates \
    build-base \
    git \
    alpine-sdk \
    libcurl \
    automake \
    autoconf \
    libxml2-dev \
    libressl-dev \
    fuse-dev \
    curl-dev && \
  git clone https://github.com/s3fs-fuse/s3fs-fuse.git && \
  cd s3fs-fuse && \
  git checkout tags/${S3FS_VERSION} && \
  ./autogen.sh && \
  ./configure --prefix=/usr && \
  make -j && \
  make install


FROM alpine

COPY --from=build /usr/bin/s3fs /usr/bin/s3fs


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

RUN mkdir /opt/s3fs && \
    apk --no-cache add \
      ca-certificates \
      fuse \
      libxml2 \
      libcurl \
      libgcc \
      libstdc++ \
      tini && \
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
