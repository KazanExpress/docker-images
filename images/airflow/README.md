# airflow

Репозиторий с базовым образом airflow

## Оглавление

 - [Процесс обновления образа](#upgrade-process)

## <a name="upgrade-process">Процесс обновления образа</a>

 1. Вносим изменения в `Dockerfile`
 2. Доносим измененный образ до ветки `master`
 3. Пушим git-tag на коммит с изменением Dockerfile c версией нового образа 
 5. Обновление образана на dev
    1. В папке `chart/airflow` в репе [ke-infra-helm](https://github.com/KazanExpress/ke-infra-helm) изменяем `airflow:image:tag` в `values.dev.yaml` и доносим до ветки `master`
 6. Обновление образана на prod
    1. В папке `chart/airflow` в репе [ke-infra-helm](https://github.com/KazanExpress/ke-infra-helm) изменяем `airflow:image:tag` в `values.prod.yaml` и доносим до ветки `master`