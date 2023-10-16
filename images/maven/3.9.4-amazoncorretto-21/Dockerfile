FROM maven:3.9.4-amazoncorretto-21-debian

RUN apt update \
    && apt -y install openssh-client \
    && apt clean \

ADD settings.xml /usr/share/maven/conf/
