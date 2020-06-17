#!/bin/bash
# ==========================================================
# Inicializar variables de entorno
# Author : Franco Barrientos <franco.barrientos@arzov.com>
# ==========================================================

# ----------------------------------------------------------
#  Exportar variables desde AWS CloudFormation
# ----------------------------------------------------------

# ARV
export NUXT_ENV_AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION

aws cloudformation describe-stacks \
    --stack-name arv \
	--query 'Stacks[0].Outputs[?OutputKey==`CGUserPoolARVId`].OutputValue' \
	--output text > tmp; export NUXT_ENV_AWS_COGNITO_USER_POOL_ID=$(cat tmp); rm tmp

aws cloudformation describe-stacks \
    --stack-name arv \
	--query 'Stacks[0].Outputs[?OutputKey==`CGUserPoolClientARVId`].OutputValue' \
	--output text > tmp; export NUXT_ENV_AWS_COGNITO_USER_POOL_CLIENT_ID=$(cat tmp); rm tmp

aws cloudformation describe-stacks \
    --stack-name arv \
	--query 'Stacks[0].Outputs[?OutputKey==`CGUserPoolDomainARVId`].OutputValue' \
	--output text > tmp; export NUXT_ENV_AWS_COGNITO_USER_POOL_DOMAIN=$(cat tmp); rm tmp

export NUXT_ENV_AWS_COGNITO_USER_POOL_DOMAIN=$NUXT_ENV_AWS_COGNITO_USER_POOL_DOMAIN.auth.$AWS_DEFAULT_REGION.amazoncognito.com

aws cloudformation describe-stacks \
    --stack-name arv \
	--query 'Stacks[0].Outputs[?OutputKey==`ASGraphQLApiARVUrl`].OutputValue' \
	--output text > tmp; export NUXT_ENV_AWS_APPSYNC_ARZOV_URL=$(cat tmp); rm tmp

# UMT
aws cloudformation describe-stacks \
    --stack-name umt \
	--query 'Stacks[0].Outputs[?OutputKey==`ASGraphQLApiUMTUrl`].OutputValue' \
	--output text > tmp; export NUXT_ENV_AWS_APPSYNC_UMATCH_URL=$(cat tmp); rm tmp

export NUXT_ENV_ROOT_URL=https://$AWS_R53_UMT_DOMAIN

aws cloudformation describe-stacks \
    --stack-name umt \
	--query 'Stacks[0].Outputs[?OutputKey==`CFDistributionUMTPWAId`].OutputValue' \
	--output text > tmp; export NUXT_ENV_AWS_CLOUDFRONT_ID=$(cat tmp); rm tmp

export NUXT_ENV_AWS_APPSYNC_AUTH_TYPE=AMAZON_COGNITO_USER_POOLS


# ----------------------------------------------------------
#  Exportar variables desde GCP
# ----------------------------------------------------------

export NUXT_ENV_GCP_API_KEY=AIzaSyDMPZpYstVP0XbTiPIeJnIgLhNm3l6PlnM