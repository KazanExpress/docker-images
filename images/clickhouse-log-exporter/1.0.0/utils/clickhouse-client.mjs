import _ from 'lodash';
import { Transform } from 'stream';

import { Session, serviceClients } from '@yandex-cloud/nodejs-sdk';
import {
  StreamClusterLogsRequest,
  StreamClusterLogsRequest_ServiceType,
  StreamLogRecord,
} from '@yandex-cloud/nodejs-sdk/dist/generated/yandex/cloud/mdb/clickhouse/v1/cluster_service.js';

export class ClickhouseClient {
  /**
   * @param {Session} session
   */
  constructor(session, clusterId) {
    this.clusterId = clusterId;
    this.session = session;
    this.clusterService = this.session.client(
      serviceClients.ClickHouseClusterServiceClient
    );
  }

  /**
   *
   * @param {Partial<StreamClusterLogsRequest>} opts
   * @returns
   */
  streamLogs(opts) {
    return this.clusterService.streamLogs(
      StreamClusterLogsRequest.fromPartial({
        clusterId: this.clusterId,
        serviceType: StreamClusterLogsRequest_ServiceType.CLICKHOUSE,
        ...opts,
      })
    );
  }

  /**
   * @param {AsyncIterable<StreamLogRecord>} stream
   */
  async *getProcessMessageIterator(stream) {
    for await (const msg of stream) {
      yield {
        nextRecordToken: msg.nextRecordToken,
        clusterId: this.clusterId,
        ...msg.record,
      };
    }
  }
}

class BatchStream extends Transform {
  constructor(batchSize = 10, batchSendTimeout = 10000) {
    super({
      objectMode: true,
    });

    this.batchSize = batchSize;
    this.batchSendTimeout = batchSendTimeout;
    this.buffer = [];
  }

  _transform(chunk, _encoding, callback) {
    this.buffer.push(chunk);

    if (this.buffer.length >= this.batchSize) {
      this.push(this.makeBatch());
    }

    this.setTimeout();

    callback();
  }

  _flush(callback) {
    clearTimeout(this.timeout);
    if (this.buffer.length > 0) {
      this.push(this.makeBatch());
    }
    callback();
  }

  setTimeout() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (this.buffer.length > 0) {
        this.push(this.makeBatch());
      } else {
        console.debug('no messages to send');
      }
    }, this.batchSendTimeout);
  }

  makeBatch() {
    const max = _.maxBy(this.buffer, (r) => parseInt(r.nextRecordToken, 10));
    const batch = { max: max.nextRecordToken, buffer: [...this.buffer] };

    this.buffer = [];

    return batch;
  }
}

ClickhouseClient.getBatchStream = function (batchSize = 10, timeout = 10000) {
  return new BatchStream(batchSize, timeout);
};
