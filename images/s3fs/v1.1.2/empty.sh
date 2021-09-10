#! /usr/bin/env sh

DEST=${AWS_S3_MOUNT:-/opt/s3fs/$AWS_S3_BUCKET}
. trap.sh

tail -f /dev/null