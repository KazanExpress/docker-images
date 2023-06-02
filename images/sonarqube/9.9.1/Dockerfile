FROM sonarqube:9.9.1-community

RUN wget -q https://github.com/sleroy/sonar-slack-notifier-plugin/releases/download/2.6.0/cks-slack-notifier-2.6.0.jar && \
    mkdir /lib/sonarqube-plugins

WORKDIR /lib/sonarqube-plugins
COPY sonarqube-community-branch-plugin-1.14.0.jar ./sonarqube-community-branch-plugin.jar

WORKDIR /opt/sonarqube

ENTRYPOINT ["/opt/sonarqube/bin/run.sh"]
