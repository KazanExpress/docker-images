FROM postgres:14.5

RUN apt-get update  \
    && apt-get install -y git make \
    && rm -rf /var/lib/apt/lists/* \
# hunspell_dicts
    && git clone --depth 1 https://github.com/postgrespro/hunspell_dicts.git /tmp/hunspell_dicts \
    && cd /tmp/hunspell_dicts/hunspell_ru_ru \
    && git checkout 918f8d093b1b6cd5f7e4c6b4874f559d7210b207 \
    && make USE_PGXS=1 install \
    && rm -rf /tmp/hunspell_dicts

COPY install-ltree-and-hunspell.sh /docker-entrypoint-initdb.d/