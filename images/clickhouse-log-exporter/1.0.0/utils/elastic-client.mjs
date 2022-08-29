import axios from 'axios';
import { Client } from '@elastic/elasticsearch';
import fs from 'fs';

export class ElasticClient {
  /**
   * @param {string} node
   * @param {{ username: string, password: string }} auth
   * @param {string} certPath
   */
  constructor(node, auth, certPath) {
    this.config = {
      node,
      auth,
      certPath,
    };
  }

  async connect() {
    const { node, auth } = this.config;
    const cert = await this._loadKey();
    const tls = {
      ca: cert,
      rejectUnauthorized: true,
    };

    this.client = new Client({ node, auth, tls });
  }

  async streamWrite(index, datasource) {
    return this.client.helpers.bulk({
      datasource,
      flushInterval: 10000,
      refreshOnCompletion: true,
      onDocument() {
        return {
          index: { _index: index },
        };
      },
    });
  }

  async getProgress(index, clusterId) {
    try {
      const progress = await this.client.get({
        index,
        id: clusterId,
      });

      return progress._source;
    } catch (e) {
      if (e.meta && e.meta.statusCode !== 404) {
        throw e;
      }
    }
  }

  async setProgress(index, clusterId, document) {
    try {
      return await this.client.index({
        index,
        id: clusterId,
        refresh: true,
        document,
      });
    } catch (e) {
      if (e.meta && e.meta.statusCode !== 404) {
        throw e;
      }
    }
  }

  async _loadKey() {
    const { certPath } = this.config;

    if (fs.existsSync(certPath)) {
      return fs.promises.readFile(certPath, 'utf-8');
    }

    const req = await axios.get(certPath, {
      validateStatus: function (status) {
        return status < 400;
      },
    });

    return await req.data;
  }
}
