#!/bin/bash

export AWS_BUCKET_NAME="$AWS_S3_DEPLOY_BUCKET"
export AWS_CLOUDFRONT="$AWS_CLOUDFRONT"

# Load nvm (node version manager), install node (version in .nvmrc), and npm install packages
[ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh" && nvm use
# Npm install if not already.
[ ! -d "node_modules" ] && npm install

npm install -g gulp
npm run generate
gulp deploy
