#!/bin/bash

chmod +x env.sh; source ./env.sh

export NUXT_ENV_ROOT_URL=http://localhost:3000

cross-env NUXT_HOST=0.0.0.0 NUXT_PORT=3000 nuxt