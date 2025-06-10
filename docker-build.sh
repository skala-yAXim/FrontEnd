#!/bin/bash
NAME=team-14
IMAGE_NAME="frontend"
VERSION="1.0.0"

# sudo mkdir -p /root/.docker/cli-plugins
# sudo cp ~/.docker/cli-plugins/docker-buildx /root/.docker/cli-plugins/

# Docker 이미지 빌드
sudo docker buildx build \
  --tag ${NAME}-${IMAGE_NAME}:${VERSION} \
  --file Dockerfile \
  --platform linux/amd64 \
  --load \
  ${IS_CACHE} .
