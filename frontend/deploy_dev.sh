#!/bin/bash

export AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_DEV"
export AWS_SECRET_ACCESS_KEY="$AWS_SECRET_KEY_DEV"
export AWS_BUCKET_NAME="$AWS_S3_BUCKET_DEV"
export AWS_CLOUDFRONT="$AWS_CLOUDFRONT_DEV"

# Load nvm (node version manager), install node (version in .nvmrc), and npm install packages
[ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh" && nvm use
# Npm install if not already.
[ ! -d "node_modules" ] && npm install

npm run generate
gulp deploy
