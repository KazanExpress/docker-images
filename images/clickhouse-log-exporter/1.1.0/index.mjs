import { Session } from '@yandex-cloud/nodejs-sdk';
import 'dotenv/config';
import assert from 'assert';
import _ from 'lodash';

import { ClickhouseClient } from './utils/clickhouse-client.mjs';
import { ElasticClient } from './utils/elastic-client.mjs';
import { KmsClient } from './utils/kms-client.mjs';
import { pipeline } from 'stream/promises';
import moment from 'moment';
import { ElasticStructure } from './utils/elastic-structure.mjs';

const elasticUrl = process.env.ELASTIC_URL;
const elasticCertUrl = process.env.ELASTIC_CERT_URL || '/config/ca.pem';
const elasticUserName = process.env.ELASTIC_USERNAME;
const encryptedElasticSecret = process.env.ELASTIC_ENC_PW;
const elasticPassword = process.env.ELASTIC_PASSWORD;
const elasticIndex = process.env.ELASTIC_INDEX;
const elasticProgressIndex = process.env.ELASTIC_PROGRESS_INDEX;

const kmsKeyId = process.env.KMS_KEY_ID;
const retentionOverrides = JSON.parse(process.env.ELASTIC_RETENTIONS || '{}');

const clickhouseClusterId = process.env.CLICKHOUSE_CLUSTER_ID;
const clickhouseLogFilter = process.env.CLICKHOUSE_LOG_FILTER;

assert.ok(!!elasticUrl, 'Elastic: url is missing');
assert.ok(!!elasticUserName, 'Elastic: username is missing');
assert.ok(
  !!elasticPassword || !!encryptedElasticSecret,
  'Elastic: password or secret is missin'
);

if (encryptedElasticSecret) {
  assert.ok(!!kmsKeyId, 'KMS: keyId is missing');
}

assert.ok(!!clickhouseClusterId, 'Clickhouse: clusterId is missing');
assert.ok(
  !!process.env.YC_SERVICE_ACCOUNT_PATH || !!process.env.YC_SERVICE_ACCOUNT,
  'Clickhouse: clusterId is missing'
);

const targetIndex = elasticIndex || `clickhouse_logs-${clickhouseClusterId}`;
const progressIndex =
  elasticProgressIndex || `.ch-log-exporter-${targetIndex}-progress`;
const processorBatchSize = process.env.PROCESSOR_BATCH_SIZE;
const processorBatchTimeout = process.env.PROCESSOR_BATCH_TIMEOUT;
const processorStartFrom = process.env.PROCESSOR_START_FROM || 'P1D';

assert.ok(
  moment.isDuration(moment.duration(processorStartFrom)),
  `invalid duration: ${processorStartFrom}`
);

const serviceAccountJson = process.env.YC_SERVICE_ACCOUNT
  ? JSON.parse(process.env.YC_SERVICE_ACCOUNT)
  : (
      await import(process.env.YC_SERVICE_ACCOUNT_PATH, {
        assert: { type: 'json' },
      })
    ).default;

const session = new Session({ serviceAccountJson });
const kmsClient = new KmsClient(session);
const clickhouseClient = new ClickhouseClient(session, clickhouseClusterId);

console.debug('Retrieve elastic credentials...');

const finalElasticPassword = elasticPassword
  ? elasticPassword
  : (await kmsClient.decrypt(encryptedElasticSecret, kmsKeyId)).plaintext
      .toString()
      .trim();

console.debug({ finalElasticPassword });

const elasticClient = new ElasticClient(
  elasticUrl,
  {
    username: elasticUserName,
    password: finalElasticPassword,
  },
  elasticCertUrl
);
await elasticClient.connect();

const elasticStructure = new ElasticStructure(
  elasticClient.client,
  targetIndex
);

const elasticIndexExists = await elasticClient.indexExists(
  ElasticStructure.configIndex(targetIndex)
);

console.debug('Config index: ', ElasticStructure.configIndex(targetIndex));

if (!elasticIndexExists) {
  await elasticStructure.create(
    _.extend(
      {
        info: '14d',
        warn: '7d',
        error: '7d',
        fatal: '4d',
        trace: '4d',
        debug: '4d',
        notice: '1d',
      },
      retentionOverrides
    )
  );
}

const lastProgressRecord = await elasticClient.getProgress(
  progressIndex,
  clickhouseClusterId
);

console.debug(
  'Restore progress from Elastic...',
  lastProgressRecord || 'No progress!'
);

// Request always should be same
const logRequest = lastProgressRecord
  ? {
      ...lastProgressRecord,
      fromTime: moment(lastProgressRecord.fromTime).toDate(),
    }
  : {
      fromTime: moment().subtract(moment.duration(processorStartFrom)).toDate(),
      filter: clickhouseLogFilter,
      clusterId: clickhouseClusterId,
    };

if (lastProgressRecord && clickhouseLogFilter !== lastProgressRecord.filter) {
  console.error(
    'Log filter param differs from saved. Please delete old indicies and progress and restart process',
    {
      lastProgressRecord,
      clickhouseLogFilter,
      clickhouseClusterId,
    }
  );

  process.exit(128);
}

console.debug(`Elastic indexes: ${elasticIndex}, ${progressIndex}`);
console.debug(
  lastProgressRecord
    ? `Processing logs from: ${progressIndex}; lastRecord: ${JSON.stringify(
        logRequest
      )}`
    : `Start processing logs from scratch from ${JSON.stringify(logRequest)}`
);

const logStream = clickhouseClient.streamLogs(logRequest);

const logIterator = clickhouseClient.getProcessMessageIterator(logStream);
const batchStream = ClickhouseClient.getBatchStream(
  processorBatchSize,
  processorBatchTimeout
);

const indexSelector = (doc) => {
  return {
    index: {
      _index: elasticStructure.indexName(doc.message.severity),
    },
  };
};

await pipeline(logIterator, batchStream, async function* (source) {
  for await (const { max, buffer } of source) {
    await elasticClient.streamWrite(targetIndex, buffer, indexSelector);
    await elasticClient.setProgress(progressIndex, clickhouseClusterId, {
      ...logRequest,
      recordToken: max,
    });

    console.debug(
      `Send ${buffer.length} records to elasticsearch, next record: ${max}`
    );
  }
});
