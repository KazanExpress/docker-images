import { Client } from '@elastic/elasticsearch';

export class ElasticStructure {
  /**
   *
   * @param {Client} client
   * @param {string} index
   */
  constructor(client, index) {
    this.client = client;
    this.index = index;
  }

  indexName(severity) {
    return `${this.index}-${severity}`;
  }

  _ilmName(severity) {
    return `ch-export-${this.indexName(severity)}`;
  }

  async create(severities) {
    for (const [severity, ttl] of Object.entries(severities)) {
      console.debug('=== create index: ', { severity, ttl });
      await this.createLifecyclePolicy(severity, ttl);
      await this.createIndexTemplate(severity);
      await this.createIndex(severity);
    }
    await this.client.index({
      index: `${this.index}-config`,
      document: {
        configured: Date.now(),
      },
    });
  }

  createLifecyclePolicy(severity, ttl) {
    /** @type {import('@elastic/elasticsearch/lib/api/types').IlmPutLifecycleRequest} */
    const policy = {
      name: this._ilmName(severity),
      policy: {
        phases: {
          hot: {
            actions: {
              rollover: {
                max_age: ttl,
              },
            },
          },
          delete: {
            actions: {
              delete: {
                delete_searchable_snapshot: true,
              },
            },
          },
        },
      },
    };

    return this.client.ilm.putLifecycle(policy);
  }

  createIndexTemplate(severity) {
    const indexAlias = this.indexName(severity);
    const ilm = this._ilmName(severity);

    /** @type {import('@elastic/elasticsearch/lib/api/types').IndicesPutTemplateRequest} */
    const indexTemplate = {
      name: `ch-export-index-template-${indexAlias}`,
      index_patterns: [`${indexAlias}*`],
      mappings: {
        dynamic: true,
      },
      settings: {
        index: {
          lifecycle: {
            name: ilm,
            rollover_alias: indexAlias,
          },
        },
      },
    };

    return this.client.indices.putTemplate(indexTemplate);
  }

  /**
   * @param {string} severity
   * @returns
   */
  createIndex(severity) {
    const indexAlias = this.indexName(severity);

    return this.client.indices.create({
      index: `${indexAlias}-000001`,
      aliases: {
        [indexAlias]: {
          is_write_index: true,
        },
      },
    });
  }
}

ElasticStructure.configIndex = (prefix) => {
  return `${prefix}-config`;
};
