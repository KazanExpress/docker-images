FROM dart:latest

# Версия FVM
ARG FVM_VERSION="3.1.4"

# Ставим рабочую на /app
WORKDIR /app

# Зависимости
RUN apt-get update && apt-get install -y curl git unzip xz-utils zip

# Установка с аргументом версии
RUN curl -fsSL https://raw.githubusercontent.com/leoafarias/fvm/main/scripts/install.sh | bash -s "$FVM_VERSION"