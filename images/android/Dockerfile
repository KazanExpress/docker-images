FROM openjdk:11-jdk
LABEL maintainer="Gaifullin Amir <gajjfullinai@gmail.com>"

ENV BUILD_TOOLS "33.0.0"
ENV TARGET_SDK "33"
ENV ANDROID_SDK_ROOT "/opt/sdk"
ENV ANDROID_HOME ${ANDROID_SDK_ROOT}
ENV CMDLINE_VERSION "7.0"
ENV SDK_TOOLS "8512546"
ENV PATH $PATH:${ANDROID_SDK_ROOT}/cmdline-tools/${CMDLINE_VERSION}/bin:${ANDROID_SDK_ROOT}/platform-tools:${ANDROID_SDK_ROOT}/extras/google/instantapps
ENV PATH $PATH:${ANDROID_SDK_ROOT}/build-tools/${BUILD_TOOLS}

SHELL ["/bin/ash", "-o", "pipefail", "-c"]
RUN apk upgrade && \
    apk add --no-cache bash=5.1.16-r2 curl=7.55.0-r2 git=2.37.1-r1 unzip=6.0-r10 wget=1.21.3-r1 coreutils=9.1-r0 && \
    rm -rf /tmp/* && \
    rm -rf /var/cache/apk/* && \
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-${SDK_TOOLS}_latest.zip -O /tmp/tools.zip && \
    mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools && \
    unzip -qq /tmp/tools.zip -d ${ANDROID_SDK_ROOT}/cmdline-tools && \
    mv ${ANDROID_SDK_ROOT}/cmdline-tools/* ${ANDROID_SDK_ROOT}/cmdline-tools/${CMDLINE_VERSION} && \
    rm -v /tmp/tools.zip && \
    mkdir -p ~/.android/ && touch ~/.android/repositories.cfg && \
    yes | sdkmanager --sdk_root=${ANDROID_SDK_ROOT} --licenses && \
    sdkmanager --sdk_root=${ANDROID_SDK_ROOT} --install "platform-tools" "extras;google;instantapps" &&\
    sdkmanager --sdk_root="${ANDROID_SDK_ROOT}" --install "build-tools;${BUILD_TOOLS}" "platforms;android-${TARGET_SDK}" && \
    sdkmanager --sdk_root="${ANDROID_SDK_ROOT}" --uninstall emulator

WORKDIR /home/android

CMD ["/bin/bash"]