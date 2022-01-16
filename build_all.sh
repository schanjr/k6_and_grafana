#!/usr/bin/env bash

docker-compose down
docker image rm k6_and_grafana_grafana
docker-compose up
