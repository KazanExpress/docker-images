FROM alpine:3.16 as build

WORKDIR /artifacts

RUN wget -q https://github.com/allure-framework/allurectl/releases/download/2.9.1/allurectl_linux_386 -O ./allurectl && \
    chmod +x ./allurectl && \
    wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -O google-chrome-stable_current_amd64.deb && \
    wget -q https://github.com/qa-guru/allure-notifications/releases/download/4.2.1/allure-notifications-4.2.1.jar -O notifications.jar


FROM summerwind/actions-runner-dind:v2.306.0-ubuntu-20.04

COPY --from=build --chown=runner:runner /artifacts /home/runner

USER root

RUN set -ex && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
    wget \
    libgconf-2-4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnss3-dev \
    libxss-dev \
    fonts-liberation \
    libasound2 \
    libu2f-udev \
    libvulkan1 \
    xdg-utils \
    jq \
    /home/runner/google-chrome-stable_current_amd64.deb && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /home/runner

USER runner
