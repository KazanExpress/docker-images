# KazanExpress Docker Images

This repository contains dockerfiles and builds public docker images from them.

Check available docker images [here](https://github.com/orgs/KazanExpress/packages?repo_name=ke-infra-docker).

## Instructions

If you want to add your own docker image, then create directories in `images` in the following format: `images/image-name/version-tag`.

And put `Dockerfile` there.

For example:

```bash
images
├── commitizen
│  └── v2
│     ├── Dockerfile
│     └── README.md
├── github-cli
│  └── v1
│     ├── Dockerfile
│     └── README.md
└── kafka-connect
   └── v1.6.1
      ├── docker-entrypoint.sh
      ├── Dockerfile
      └── README.md
```

After pushing a new tag, GitHub Actions will build and push these docker images:

```txt
ghcr.io/kazanexpress/commitizen:v2
ghcr.io/kazanexpress/kafka-connect:v1.6.1
ghcr.io/kazanexpress/github-cli:v1
```

## Conventions

We follow [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) rules and use [commitizen](https://commitizen-tools.github.io/commitizen/) to release new version.

If commit message does not meet convention, build will fail!
