FROM postgres:14.5

RUN apt-get update  \
    && apt-get install -y git make \
    && rm -rf /var/lib/apt/lists/* \
# hunspell_dicts
    && git clone https://github.com/postgrespro/hunspell_dicts.git /tmp/hunspell_dicts \
    && cd /tmp/hunspell_dicts/hunspell_ru_ru \
    && make USE_PGXS=1 install \
    && rm -rf /tmp/hunspell_dicts

COPY install-ltree-and-hunspell.sh /docker-entrypoint-initdb.d/