#!/usr/bin/env bash
#docker stop $(docker ps -aq)
docker-compose -f docker-compose.database.yml up --build -d
