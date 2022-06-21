FROM sonarqube:9.3.0-community

RUN wget -q https://github.com/sleroy/sonar-slack-notifier-plugin/releases/download/2.6.0/cks-slack-notifier-2.6.0.jar \
    && mv "cks-slack-notifier-2.6.0.jar" "$SQ_EXTENSIONS_DIR/plugins/cks-slack-notifier-2.6.0.jar"

ENTRYPOINT ["/opt/sonarqube/bin/run.sh"]
