FROM debian:bookworm-slim
LABEL maintainer="Gaifullin Amir <gajjfullinai@gmail.com>"

ENV JAVA "17"
ENV JAVA_VER "17.0.*"
ENV JAVA_HOME "/usr/lib/jvm/java-${JAVA}-openjdk-arm64"
ENV GRADLE_VERSION "8.10"
ENV GRADLE_HOME=/opt/gradle/gradle-${GRADLE_VERSION}
ENV BUILD_TOOLS "35.0.0"
ENV TARGET_SDK "35"
ENV ANDROID_SDK_ROOT "/opt/sdk"
ENV ANDROID_HOME ${ANDROID_SDK_ROOT}
ENV CMDLINE_VERSION "9.0"
ENV SDK_TOOLS "11076708"
ENV NDK_VERSION "25.2.9519653"
ENV PATH="${PATH}:/sbin"
ENV PATH $PATH:${ANDROID_SDK_ROOT}/cmdline-tools/${CMDLINE_VERSION}/bin:${ANDROID_SDK_ROOT}/platform-tools:${ANDROID_SDK_ROOT}/extras/google/instantapps
ENV PATH $PATH:${ANDROID_SDK_ROOT}/build-tools/${BUILD_TOOLS}
ENV PATH=$PATH:${GRADLE_HOME}/bin

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN set -eux; \
	apt-get update; \
	apt-get install -y --no-install-recommends \
    ca-certificates=20230311 \
    wget=1.21* \
    unzip=6.0* \
    curl \
    git \
    jq=1.6-* \
    openjdk-${JAVA}-jdk-headless=${JAVA_VER} && \
	rm -rf /var/lib/apt/lists/* && \
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-${SDK_TOOLS}_latest.zip -O /tmp/tools.zip && \
    mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools && \
    unzip -qq /tmp/tools.zip -d ${ANDROID_SDK_ROOT}/cmdline-tools && \
    mv ${ANDROID_SDK_ROOT}/cmdline-tools/* ${ANDROID_SDK_ROOT}/cmdline-tools/${CMDLINE_VERSION} && \
    rm -v /tmp/tools.zip && \
    mkdir -p ~/.android/ && touch ~/.android/repositories.cfg && \
    yes | sdkmanager --sdk_root=${ANDROID_SDK_ROOT} --licenses || true && \
    sdkmanager --sdk_root=${ANDROID_SDK_ROOT} --install "platform-tools" "extras;google;instantapps" && \
    sdkmanager --sdk_root="${ANDROID_SDK_ROOT}" --install "build-tools;${BUILD_TOOLS}" "platforms;android-${TARGET_SDK}" "ndk;${NDK_VERSION}" && \
    sdkmanager --sdk_root="${ANDROID_SDK_ROOT}" --uninstall emulator

WORKDIR /opt/gradle
RUN curl -L https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip -o gradle-${GRADLE_VERSION}-bin.zip
RUN unzip gradle-${GRADLE_VERSION}-bin.zip
RUN gradle --version
RUN rm gradle-${GRADLE_VERSION}-bin.zip

CMD ["jshell"]
