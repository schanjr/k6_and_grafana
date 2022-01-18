#!/usr/bin/env bash
docker build \
--build-arg GF_SECURITY_ADMIN_USER=${GF_SECURITY_ADMIN_USER} \
--build-arg GF_SECURITY_ADMIN_PASSWORD=${GF_SECURITY_ADMIN_PASSWORD} \
-t grafana \
grafana
