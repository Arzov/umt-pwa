#!/bin/bash
# ==========================================================
# Testing backend en AWS
# Author : Franco Barrientos <franco.barrientos@arzov.com>
# ==========================================================


# ----------------------------------------------------------
#  Generar template.yml
# ----------------------------------------------------------

chmod +x samtemplate.sh; ./samtemplate.sh
status=$?


# ----------------------------------------------------------
#  Levantar servicio AWS DynamoDB
# ----------------------------------------------------------

docker network create arzov-local-network
docker run --name aws-arzov -d -p 8000:8000 \
    --network arzov-local-network \
    --network-alias arzov \
    amazon/dynamodb-local \
    -jar DynamoDBLocal.jar \
    -inMemory -sharedDb

# Crear tablas
dynamodb_conn="--endpoint-url http://localhost:8000 --region localhost"

aws dynamodb create-table --cli-input-json file://dynamodb/tables/umt-messages/local-test.json $dynamodb_conn


# ----------------------------------------------------------
#  Levantar servicio AWS Lambda
# ----------------------------------------------------------

# Reemplazar variables en archivo template.yml
sed "
    s/@AWS_S3_PWA_BUCKET/$AWS_S3_PWA_BUCKET/g;
    s+@AWS_LAMBDA_ROLE+$AWS_LAMBDA_ROLE+g
" template.yml > template_tmp.yml

sam local start-lambda --docker-network arzov-local-network -t template_tmp.yml \
    --env-vars lambda/functions/env.json & pids="${pids-} $!"
status=$((status + $?))


# ----------------------------------------------------------
#  Pruebas AWS Lambda
# ----------------------------------------------------------

cd lambda/functions

# cd umt-add-court; npm install; npm run test; cd ../
# status=$((status + $?))

# cd umt-add-match; npm install; npm run test; cd ../
# status=$((status + $?))

cd umt-add-message; npm install; npm run test; cd ../
status=$((status + $?))

# Detener servicios
kill -9 $pids
docker kill aws-arzov
docker rm aws-arzov
docker network rm arzov-local-network

# Remover archivos temporales
cd ../../
rm template_tmp.yml
rm template.yml
status=$((status + $?))

exit $status