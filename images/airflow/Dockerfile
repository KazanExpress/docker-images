FROM apache/airflow:2.3.3-python3.9

ARG NEXUS_USER_AIRFLOW \
    NEXUS_PASSWORD_AIRFLOW

ENV AIRFLOW_COMMONS_VERSION=0.1.23
ENV AIRFLOW_DAG_GENERATOR=0.1.1

RUN pip install --upgrade pip

RUN pip install --no-cache-dir --extra-index-url https://$NEXUS_USER_AIRFLOW:$NEXUS_PASSWORD_AIRFLOW@nexus.infra.cluster.kznexpess.com/repository/ke-pypi/simple/ \
    kazanexpress-airflow-commons==$AIRFLOW_COMMONS_VERSION  \
    airflow-dag-generator==$AIRFLOW_DAG_GENERATOR
