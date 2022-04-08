FROM sonarqube:9.4-community

RUN wget https://github.com/sleroy/sonar-slack-notifier-plugin/releases/download/2.6.0/cks-slack-notifier-2.6.0.jar

ADD sonarqube-community-branch-plugin-1.11.0-SNAPSHOT.jar ./sonarqube-community-branch-plugin.jar

RUN mkdir /lib/sonarqube-plugins
RUN mv sonarqube-community-branch-plugin.jar /lib/sonarqube-plugins

ENTRYPOINT ["/opt/sonarqube/bin/run.sh"]
