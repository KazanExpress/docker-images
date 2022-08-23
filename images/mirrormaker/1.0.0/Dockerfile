FROM prokop7/maven3.6.1-jdk11 AS build

WORKDIR /app

COPY  mirrormaker_topic_rename/pom.xml ./

COPY mirrormaker_topic_rename/src ./src

RUN mvn package

FROM quay.io/strimzi/kafka:0.27.0-kafka-3.0.0
USER root
RUN sed -i 's|\\"\${KAFKA_MIRRORMAKER_MESSAGE_HANDLER_ARGS}\\"|\${KAFKA_MIRRORMAKER_MESSAGE_HANDLER_ARGS}|g' /opt/kafka/kafka_mirror_maker_run.sh

USER kafka
COPY --from=build /app/target/mmchangetopic-1.0-SNAPSHOT.jar /opt/kafka/libs

