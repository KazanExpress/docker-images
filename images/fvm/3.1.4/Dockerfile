FROM dart:3.3.4

# Версия FVM
ARG FVM_VERSION="3.1.4"

# Ставим рабочую на /app
WORKDIR /app

# Зависимости
RUN apt-get update && apt-get install -y --no-install-recommends curl git unzip xz-utils zip \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Установка с аргументом версии
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN curl -fsSL https://raw.githubusercontent.com/leoafarias/fvm/main/scripts/install.sh | bash -s "$FVM_VERSION"