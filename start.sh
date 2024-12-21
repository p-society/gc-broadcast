#!/bin/bash

PRIVATE_IP=$(ifconfig wlp2s0 | grep 'inet ' | awk '{print $2}')
if [ -z "$PRIVATE_IP" ]; then
  echo "Private IP not found!"
  exit 1
fi

export PRIVATE_IP
sudo docker stop $(sudo docker ps -aq) && sudo docker rm $(sudo docker ps -aq)
echo $PRIVATE_IP
sudo docker-compose -f docker/docker-compose.dev.yml up
