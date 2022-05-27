# Solution for reloading k8s managed node groups

[Yandex Timer Trigger](https://cloud.yandex.com/en-ru/docs/functions/concepts/trigger/timer) uses [Yandex Serverless Container](https://cloud.yandex.com/en/docs/serverless-containers) with current docker image to reload k8s managed node groups.

## ENV Variables

Volume             | Description                                      | Example
-------------------|--------------------------------------------------|-----------------
`YC_CLOUD_ID`      | ID of the cloud to use.                          |`aaa1bbbbbbb2ccccc3dd`
`YC_FOLDER_NAME`   | Name of the folder to use.                       |`default`
`YC_CLUSTER_NAME`  | Name of the Kubernetes cluster.                  |`dev`
`NODE_GROUPS`      | Specify node group ids. **Optional**             |`"cataaaaaaaaaaaaaaaaa dogaaaaaaaaaaaaaaaaa"`
`ONLY_PREEMPTIBLE` | Reload only preemptible node groups.**Optional** |`true`
