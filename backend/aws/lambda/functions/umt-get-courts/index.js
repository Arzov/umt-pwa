// LIBRERIAS
const AWS = require('aws-sdk');

// PARAMETROS
const dynamodb = new AWS.DynamoDB();
const DYNAMO_TABLE_COURTS = 'ARV_UMT_COURTS';
const limitScan = 100;

// FUNCIONES
function getCourts(tableName, hashKey, matchType, limitScan, nextToken, fn) {
    if (nextToken) {
        dynamodb.query({
            "TableName": tableName,
            "KeyConditionExpression": "hashKey = :v1",
            "FilterExpression": "contains (matchType, :v2)",
            "ExpressionAttributeValues": {
                ":v1": { "N": hashKey },
                ":v2": { "S": matchType }
            },
            "ExclusiveStartKey": JSON.parse(nextToken),
            "Limit": limitScan
        }, function(err, data) {
            if (err) return fn(err);
            else fn(null, data);
        });
    }
    else {
        dynamodb.query({
            "TableName": tableName,
            "KeyConditionExpression": "hashKey = :v1",
            "FilterExpression": "contains (matchType, :v2)",
            "ExpressionAttributeValues": {
                ":v1": { "N": hashKey },
                ":v2": { "S": matchType }
            },
            "Limit": limitScan
        }, function(err, data) {
            if (err) return fn(err);
            else fn(null, data);
        });
    }
}

// HANDLER
exports.handler = (event, context, callback) => {
    const hashKey = String(event.hashKey);
    const matchType = event.matchType;
    let nextToken = event.nextToken;

    // El hashKey del nextToken debe ser igual al hashKey del usuario, en caso que no sea se anula el nextToken,
    // de esta manera se evita que dynamoDB no pueda encontrar la particion correcta
    if (nextToken) {
        if (Number(JSON.parse(nextToken).hashKey.N) !== Number(hashKey)) {
            nextToken = null;
        }
    }

    // Obtener canchas cercanas
    getCourts(DYNAMO_TABLE_COURTS, hashKey, matchType, limitScan, nextToken, function(err, data) {
        if (err) console.log(err);
        else {
            // Obtener nextToken para paginacion
            let nextTokenResult = null;

            if ('LastEvaluatedKey' in data) {
                nextTokenResult = JSON.stringify(data.LastEvaluatedKey);
            }

            // Existen canchas
            if (data.Count) {

                // Quitar tipo de datos al resultado de DynamoDB
                const dataResult = data.Items.map(function(x) {
                    let unmarshallResult = AWS.DynamoDB.Converter.unmarshall(x);

                    unmarshallResult.geoJson = JSON.parse(unmarshallResult.geoJson).coordinates;
                    unmarshallResult.email = unmarshallResult.email.values;
                    unmarshallResult.matchType = unmarshallResult.matchType.values;
                    unmarshallResult.phone = unmarshallResult.phone.values;

                    // No se necesita geohash
                    delete unmarshallResult['geohash'];

                    return unmarshallResult;
                });

                callback(null, {
                    items: dataResult,
                    nextToken: nextTokenResult
                });
            }

            // No existen canchas
            else {
                callback(null, {
                    items: [],
                    nextToken: nextTokenResult
                });
            }
        }
    });
};
