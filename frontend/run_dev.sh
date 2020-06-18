#!/bin/bash

chmod +x env.sh; source ./env.sh

export NUXT_ENV_ROOT_URL=http://localhost:3000

# Npm install if not already.
[ ! -d "node_modules" ] && npm install && npm install cross-env && npm install gulp

cross-env NUXT_HOST=0.0.0.0 NUXT_PORT=3000 nuxt