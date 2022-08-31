## Environment config

```
# if empty /config/ca.pem or custom path in image
ELASTIC_CERT_URL=https://storage.yandexcloud.net/cloud-certs/CA.pem

ELASTIC_URL=https://c-{elasticId}.rw.mdb.yandexcloud.net:9200/

ELASTIC_USERNAME=elastic username

# encoded elastic password
ELASTIC_ENC_PW=

# # or raw password
# ELASTIC_PASSWORD=raw password

# target log index
ELASTIC_INDEX=

# Index that holds all instances progress
ELASTIC_PROGRESS_INDEX=

# JSON stringified level to lifecycle duration map `{"warn": "10d"}`
ELASTIC_RETENTIONS=

# yandex kms key id
KMS_KEY_ID=kms-key-id

# clickhouse instance to monitor
CLICKHOUSE_CLUSTER_ID=

# clickhouse log filter see yandex-api clickhouse cluster `streamLogs`
CLICKHOUST_LOG_FILTER="message.severity='Error'" or other filter

# # json encoded yandex service account
# YC_SERVICE_ACCOUNT="{}"

# or service account file
YC_SERVICE_ACCOUNT_PATH=/config/sa.json

# elastic write batch size
PROCESSOR_BATCH_SIZE=2000

# milliseconds to wait for messages
PROCESSOR_BATCH_TIMEOUT=10000

# ISO 8601 String duration to start from if no progress found
PROCESSOR_START_FROM=P1D
```

## Service account template

```json
{
  "serviceAccountId": "ajesmgnn9eff6081a9ku",
  "accessKeyId": "aje8ju42ab4u180iko4k",
  "privateKey": "-----BEGIN PRIVATE KEY-----\n/\n-----END PRIVATE KEY-----\n"
}
```
