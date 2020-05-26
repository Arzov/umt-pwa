#!/bin/bash
# ==========================================================
# Testing backend
# Author : Franco Barrientos <franco.barrientos@arzov.com>
# ==========================================================


# ----------------------------------------------------------
#  Parametros configurables
# ----------------------------------------------------------

# Parametros template.yml
lambda_layer="arn:aws:lambda:us-east-2:223453650380:layer:umt:1"
lambda_role="arn:aws:iam::223453650380:role/arv-lambda"


# ----------------------------------------------------------
#  Levantar servicios
# ----------------------------------------------------------

# Reemplazar variables en archivo template.yml
sed "s/@LAMBDA_LAYER/$lambda_layer/g;s+@LAMBDA_ROLE+$lambda_role+g" template.yml > template_tmp.yml

# Levantar servicio para funciones AWS Lambda
sam local start-lambda -t template_tmp.yml & pids="${pids-} $!"


# ----------------------------------------------------------
#  Testing - AWS Lambda
# ----------------------------------------------------------

# umt-add-court
cd lambda/functions/umt-add-court; npm install; npm run test

# Terminar servicio para AWS Lambda
kill -2 $pids

# Remover archivos temporales
cd ../../../
rm template_tmp.yml