#!/bin/bash
# ==========================================================
# Deploy frontend en AWS
# Author : Franco Barrientos <franco.barrientos@arzov.com>
# ==========================================================

# ----------------------------------------------------------
#  Exportar variables desde AWS CloudFormation
# ----------------------------------------------------------

# ARV
aws cloudformation describe-stacks \
    --stack-name arv \
	--query 'Stacks[0].Outputs[?OutputKey==`CGUserPoolARVId`].OutputValue' \
	--output text > tmp; export AWS_COGNITO_USER_POOL_ID=$(cat tmp); rm tmp

aws cloudformation describe-stacks \
    --stack-name arv \
	--query 'Stacks[0].Outputs[?OutputKey==`CGUserPoolClientARVId`].OutputValue' \
	--output text > tmp; export AWS_COGNITO_USER_POOL_CLIENT_ID=$(cat tmp); rm tmp

aws cloudformation describe-stacks \
    --stack-name arv \
	--query 'Stacks[0].Outputs[?OutputKey==`CGUserPoolDomainARVId`].OutputValue' \
	--output text > tmp; export AWS_COGNITO_USER_POOL_DOMAIN=$(cat tmp); rm tmp

aws cloudformation describe-stacks \
    --stack-name arv \
	--query 'Stacks[0].Outputs[?OutputKey==`ASGraphQLApiARVUrl`].OutputValue' \
	--output text > tmp; export AWS_APPSYNC_ARZOV_URL=$(cat tmp); rm tmp

# UMT
aws cloudformation describe-stacks \
    --stack-name umt \
	--query 'Stacks[0].Outputs[?OutputKey==`ASGraphQLApiUMTUrl`].OutputValue' \
	--output text > tmp; export AWS_APPSYNC_UMATCH_URL=$(cat tmp); rm tmp

aws cloudformation describe-stacks \
    --stack-name umt \
	--query 'Stacks[0].Outputs[?OutputKey==`CFDistributionUMTPWADomain`].OutputValue' \
	--output text > tmp; export AWS_CLOUDFRONT_DOMAIN=$(cat tmp); rm tmp

aws cloudformation describe-stacks \
    --stack-name umt \
	--query 'Stacks[0].Outputs[?OutputKey==`CFDistributionUMTPWAId`].OutputValue' \
	--output text > tmp; export AWS_CLOUDFRONT_ID=$(cat tmp); rm tmp


# ----------------------------------------------------------
#  Reemplazar variables para deploy
# ----------------------------------------------------------

cd static

cp app.json app_tmp.json; rm app.json
sed "
    s/@AWS_CLOUDFRONT_DOMAIN/$AWS_CLOUDFRONT_DOMAIN/g;
" app_tmp.json > app.json

cp aws.json aws_tmp.json; rm aws.json
sed "
    s+@AWS_COGNITO_USER_POOL_CLIENT_ID+$AWS_COGNITO_USER_POOL_CLIENT_ID+g;
    s+@AWS_COGNITO_USER_POOL_ID+$AWS_COGNITO_USER_POOL_ID+g;
    s+@AWS_DEFAULT_REGION+$AWS_DEFAULT_REGION+g;
    s+@AWS_COGNITO_USER_POOL_DOMAIN+$AWS_COGNITO_USER_POOL_DOMAIN+g;
    s+@AWS_APPSYNC_ARZOV_URL+$AWS_APPSYNC_ARZOV_URL+g;
    s+@AWS_APPSYNC_UMATCH_URL+$AWS_APPSYNC_UMATCH_URL+g;
" aws_tmp.json > aws.json

cd ../


# ----------------------------------------------------------
#  Deploy de Nuxt
# ----------------------------------------------------------

export AWS_BUCKET_NAME="$AWS_S3_PWA_BUCKET"
export AWS_CLOUDFRONT="$AWS_CLOUDFRONT_ID"

# Load nvm (node version manager), install node (version in .nvmrc), and npm install packages
[ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh" && nvm use
# Npm install if not already.
[ ! -d "node_modules" ] && npm install

npm install -g gulp
npm run generate
gulp deploy

# Remover archivos temporales
cd static
rm app.json; cp app_tmp.json app.json; rm app_tmp.json
rm aws.json; cp aws_tmp.json aws.json; rm aws_tmp.json