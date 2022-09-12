FROM alpine:3.16
LABEL maintainer="Gaifullin Amir <gajjfullinai@gmail.com>"

#Set environment
ENV JAVA "11"
ENV JAVA_VERSION "11.0.16.1_p1-r0"
ENV BUILD_TOOLS "33.0.0"
ENV TARGET_SDK "33"
ENV ANDROID_SDK_ROOT "/opt/sdk"
ENV ANDROID_HOME ${ANDROID_SDK_ROOT}
ENV CMDLINE_VERSION "7.0"
ENV SDK_TOOLS "8512546"
ENV PATH="${PATH}:/sbin"
ENV PATH $PATH:${ANDROID_SDK_ROOT}/cmdline-tools/${CMDLINE_VERSION}/bin:${ANDROID_SDK_ROOT}/platform-tools:${ANDROID_SDK_ROOT}/extras/google/instantapps
ENV PATH $PATH:${ANDROID_SDK_ROOT}/build-tools/${BUILD_TOOLS}
ENV JAVA_HOME="/usr/lib/jvm/default-jvm/"

# Has to be set explictly to find binaries 
ENV PATH=$PATH:${JAVA_HOME}/bin

# Set shell
SHELL ["/bin/ash", "-o", "pipefail", "-c"]

# Install package
RUN apk upgrade && \
    apk add --no-cache openjdk${JAVA}=${JAVA_VERSION} bash=5.1.16-r2 curl=7.83.1-r3 git=2.36.2-r0 unzip=6.0-r9 wget=1.21.3-r0 coreutils=9.1-r0 \
      android-tools=31.0.3p1-r7 && \
    rm -rf /tmp/* && \
    rm -rf /var/cache/apk/* && \
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-${SDK_TOOLS}_latest.zip -O /tmp/tools.zip && \
    mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools && \
    unzip -qq /tmp/tools.zip -d ${ANDROID_SDK_ROOT}/cmdline-tools && \
    mv ${ANDROID_SDK_ROOT}/cmdline-tools/* ${ANDROID_SDK_ROOT}/cmdline-tools/${CMDLINE_VERSION} && \
    rm -v /tmp/tools.zip && \
    mkdir -p ~/.android/ && touch ~/.android/repositories.cfg && \
    yes | sdkmanager --sdk_root=${ANDROID_SDK_ROOT} --licenses || true && \
    sdkmanager --sdk_root=${ANDROID_SDK_ROOT} --install "platform-tools" "extras;google;instantapps" &&\
    sdkmanager --sdk_root="${ANDROID_SDK_ROOT}" --install "build-tools;${BUILD_TOOLS}" "platforms;android-${TARGET_SDK}" && \
    sdkmanager --sdk_root="${ANDROID_SDK_ROOT}" --uninstall emulator

# Set workdir
WORKDIR /home/android

CMD ["/bin/bash"]