FROM maven:3.9.5-amazoncorretto-21-debian
RUN apt-get update \
    && apt-get -y install openssh-client git libfontconfig1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*