#!/bin/bash
# ==========================================================
# Deploy backend en AWS - Dev
# Author : Franco Barrientos <franco.barrientos@arzov.com>
# ==========================================================


# ----------------------------------------------------------
#  Parametros configurables
# ----------------------------------------------------------

# Parametros samconfig.toml
s3_bucket="arzov-umatch-artifacts-dev"
region="us-east-2"

# Parametros template.yml
lambda_layer="arn:aws:lambda:us-east-2:223453650380:layer:umt:1"
lambda_role="arn:aws:iam::223453650380:role/arv-lambda"


# ----------------------------------------------------------
#  Build local
# ----------------------------------------------------------

# Reemplazar variables en archivo template.yml
sed "s/@LAMBDA_LAYER/$lambda_layer/g;s+@LAMBDA_ROLE+$lambda_role+g" template.yml > template_tmp.yml

# AWS SAM build
sam build -t template_tmp.yml


# ----------------------------------------------------------
#  Deploy en AWS
# ----------------------------------------------------------

# Reemplazar variables en archivo samconfig.toml
sed "s/@S3_BUCKET/$s3_bucket/g;s/@REGION/$region/g" samconfig.toml > .aws-sam/build/samconfig.toml

# AWS SAM deploy
cd .aws-sam/build/
sam deploy --no-confirm-changeset

# Remover archivos temporales
cd ../../
rm template_tmp.yml
rm -R .aws-sam