FROM sonarqube:9.4-community

RUN wget -q https://github.com/sleroy/sonar-slack-notifier-plugin/releases/download/2.6.0/cks-slack-notifier-2.6.0.jar && \
    wget -q https://github.com/mc1arke/sonarqube-community-branch-plugin/releases/download/1.10.0/sonarqube-community-branch-plugin-1.10.0.jar && \
    mkdir /lib/sonarqube-plugins && \
    mv sonarqube-community-branch-plugin-1.10.0.jar /lib/sonarqube-plugins

ENTRYPOINT ["/opt/sonarqube/bin/run.sh"]
