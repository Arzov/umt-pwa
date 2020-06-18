#!/bin/bash
# ==========================================================
# Deploy frontend en AWS
# Author : Franco Barrientos <franco.barrientos@arzov.com>
# ==========================================================


# ----------------------------------------------------------
#  Cargar variables de entorno
# ----------------------------------------------------------

chmod +x env.sh; source ./env.sh


# ----------------------------------------------------------
#  Deploy de Nuxt
# ----------------------------------------------------------

export AWS_BUCKET_NAME="$AWS_S3_PWA_BUCKET"
export AWS_CLOUDFRONT="$NUXT_ENV_AWS_CLOUDFRONT_ID"

# Load nvm (node version manager), install node (version in .nvmrc), and npm install packages
[ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh" && nvm use
# Npm install if not already.
[ ! -d "node_modules" ] && npm install

npm run generate
./node_modules/.bin/gulp deploy