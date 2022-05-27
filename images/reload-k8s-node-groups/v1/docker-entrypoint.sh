#!/bin/bash

if [[ -z "$YC_CLOUD_ID" || -z "$YC_FOLDER_NAME" ]]; then
  echo "Yandex cloud id or folder name were not provided."
  exit 1
fi

if [[ -z $YC_CLUSTER_NAME ]]; then
  echo "Yandex cluster name was not provided."
  exit 1
fi

if [[ -z $NODE_GROUPS ]]; then
  if [[ $ONLY_PREEMPTIBLE ]]; then
    # get only preemprible node groups in cluster
    node_groups=`yc managed-kubernetes cluster list-node-groups $YC_CLUSTER_NAME --cloud-id $YC_CLOUD_ID --folder-name $YC_FOLDER_NAME --format json | jq '(.[] | select(.node_template.scheduling_policy.preemptible==true) | .id)'`
  else
    # get all node groups in cluster
    node_groups=`yc managed-kubernetes cluster list-node-groups $YC_CLUSTER_NAME --cloud-id $YC_CLOUD_ID --folder-name $YC_FOLDER_NAME --format json | jq '(.[] | .id)'`
  fi
else
  input_groups=( $NODE_GROUPS )
  if [[ $ONLY_PREEMPTIBLE ]]; then
    # get only preemprible node groups in cluster
    preemptible_groups=`yc managed-kubernetes cluster list-node-groups $YC_CLUSTER_NAME --cloud-id $YC_CLOUD_ID --folder-name $YC_FOLDER_NAME --format json | jq '(.[] | select(.node_template.scheduling_policy.preemptible==true) | .id)' | tr -d \"`
    # find intersection between preeemptible node groups and input node groups
    node_groups=($(comm -12 <(printf '%s\n' "${input_groups[@]}" | LC_ALL=C sort) <(printf '%s\n' "${preemptible_groups[@]}" | LC_ALL=C sort)))
  else
    node_groups=${input_groups[@]}
  fi
fi

# stop all instances in node groups
for group in ${node_groups[@]}
do
  instances=`yc compute instance-group list-instances $group --cloud-id $YC_CLOUD_ID --folder-name $YC_FOLDER_NAME --format json | jq '(.[] | .instance_id)'| tr -d \"`
  for instance in ${instances[@]}
  do
    yc compute instance stop $instance --cloud-id $YC_CLOUD_ID --folder-name $YC_FOLDER_NAME --no-user-output
  done
done
