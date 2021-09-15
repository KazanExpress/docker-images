# Elasticsearch

KazanExpress Docker Images for Elasticsearch.

## Configuration

List of additional configuration files:
- [/config](./config) - base directory (joins the `/usr/share/elasticsearch/config`);
  - [/data](./config/data) - custom user editable configurations;
      - [stopwords.txt](./config/data/stopwords.txt) - list of custom stopwords;
  - [/hunspell](./config/hunspell) - Hunspell dictionaries (see [hunspell.sh](./scripts/hunspell.sh)).
