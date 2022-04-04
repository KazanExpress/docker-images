FROM sonarqube:9.3.0-community

RUN wget https://github.com/sleroy/sonar-slack-notifier-plugin/releases/download/2.6.0/cks-slack-notifier-2.6.0.jar

RUN mv "cks-slack-notifier-2.6.0.jar" $SQ_EXTENSIONS_DIR/plugins/cks-slack-notifier-2.6.0.jar

RUN wget https://github.com/mc1arke/sonarqube-community-branch-plugin/releases/download/1.10.0/sonarqube-community-branch-plugin-1.10.0.jar

RUN mv "sonarqube-community-branch-plugin-1.10.0.jar" $SQ_EXTENSIONS_DIR/plugins/sonarqube-community-branch-plugin-1.10.0.jar

ENV SONAR_WEB_JAVAADDITIONALOPTS: -javaagent:./extensions/plugins/sonarqube-community-branch-plugin-1.10.0.jar=web
ENV SONAR_CE_JAVAADDITIONALOPTS: -javaagent:./extensions/plugins/sonarqube-community-branch-plugin-1.10.0.jar=ce

ENTRYPOINT ["/opt/sonarqube/bin/run.sh"]
