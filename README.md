# docker-images

This repository contains dockerfiles and builds public docker images from them.

Check available docker images [here](https://github.com/orgs/KazanExpress/packages?repo_name=ke-infra-docker).

## Instructions

If you want to add your own docker image, then create directories in `images` in the following format: `images/image-name/version-tag`.

And put `Dockerfile` there.

For example:

```bash
images
    github-cli
        v1
            Dockerfile
            Readme.md
        v2
            Dockerfile
            Readme.md
    kafka-connect
        v1.6.1
            Dockerfile
            entrypoint.sh
```

After running CI/CD we will have these docker images:

```txt
ghcr.io/kazanexpress/kafka-connect:v1.6.1
ghcr.io/kazanexpress/github-cli:v1
ghcr.io/kazanexpress/github-cli:v2
```

## Conventions

We follow [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) rules and use [commitizen](https://commitizen-tools.github.io/commitizen/) to release new version.
