#!/bin/bash
# ==========================================================
# Deploy backend en AWS
# Author : Franco Barrientos <franco.barrientos@arzov.com>
# ==========================================================


# ----------------------------------------------------------
#  Generar template.yml
# ----------------------------------------------------------

chmod +x samtemplate.sh; ./samtemplate.sh
status=$?


# ----------------------------------------------------------
#  Build local para AWS Lambda
# ----------------------------------------------------------

# Instalar layers
cd lambda/layers

cd umt/nodejs; npm install; cd ../../

cd ../../

# Reemplazar variables en archivo template.yml
sed "
    s/@AWS_S3_PWA_BUCKET/$AWS_S3_PWA_BUCKET/g;
    s/@AWS_DEFAULT_REGION/$AWS_DEFAULT_REGION/g;
    s/@AWS_R53_UMT_DOMAIN/$AWS_R53_UMT_DOMAIN/g;
" template.yml > template_tmp.yml

# AWS SAM build
sam build -t template_tmp.yml
status=$((status + $?))


# ----------------------------------------------------------
#  Deploy en AWS
# ----------------------------------------------------------

# Reemplazar variables en archivo samconfig.toml
sed "
    s/@AWS_S3_ARTIFACTS_BUCKET/$AWS_S3_ARTIFACTS_BUCKET/g;
    s/@AWS_DEFAULT_REGION/$AWS_DEFAULT_REGION/g
" samconfig.toml > .aws-sam/build/samconfig.toml

# AWS SAM deploy
cd .aws-sam/build/
sam deploy --no-confirm-changeset --no-fail-on-empty-changeset
status=$((status + $?))

# Remover archivos temporales
cd ../../
rm template_tmp.yml
rm template.yml
rm -R .aws-sam
status=$((status + $?))

exit $status