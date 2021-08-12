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