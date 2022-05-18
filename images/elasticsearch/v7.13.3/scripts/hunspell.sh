#!/usr/bin/env bash

BASE_DIR=config/hunspell
BASE_URL="https://raw.githubusercontent.com/LibreOffice/dictionaries/master"

# english
wget --directory-prefix=$BASE_DIR/en_US \
	${BASE_URL}/en/en_US.aff \
	${BASE_URL}/en/en_US.dic

# russian
wget --directory-prefix=$BASE_DIR/ru_RU \
	${BASE_URL}/ru_RU/ru_RU.aff \
	${BASE_URL}/ru_RU/ru_RU.dic

#BASE_URL="https://github.com/u2b3k/uz-hunspell/blob/master"

# uzbek lat
#wget --directory-prefix=$BASE_DIR/uz_UZ \
#	${BASE_URL}/uz-lat.aff \
#	${BASE_URL}/uz-lat.dic

# uzbek cyr
#wget --directory-prefix=$BASE_DIR/uz_RU \
#	${BASE_URL}/uz-cyr.aff \
#	${BASE_URL}/uz-cyr.dic