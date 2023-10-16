FROM maven:3.9.4-amazoncorretto-21-debian

RUN apt-get update \
    && apt-get -y install openssh-client \
    && apt-get clean \

ADD settings.xml /usr/share/maven/conf/
