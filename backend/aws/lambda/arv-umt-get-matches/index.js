// LIBRERIAS
const AWS = require('aws-sdk');
const moment = require('moment');

// PARAMETROS
const dynamodb = new AWS.DynamoDB();
const DYNAMO_TABLE_MATCHES = 'ARV_UMT_MATCHES';
const limitScan = 100;

// FUNCIONES
function getMatches(tableName, hashKey, currentDate, limitScan, nextToken, fn) {
    if (nextToken) {
        dynamodb.query({
            "TableName": tableName,
            "KeyConditionExpression": "hashKey = :v1",
            "FilterExpression": "expireAt >= :v2 and matchStatus <> :v3",
            "ExpressionAttributeValues": {
                ":v1": { "S": hashKey },
                ":v2": { "S": currentDate },
                ":v3": { "S": 'C' }
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
            "FilterExpression": "expireAt >= :v2 and matchStatus <> :v3",
            "ExpressionAttributeValues": {
                ":v1": { "S": hashKey },
                ":v2": { "S": currentDate },
                ":v3": { "S": 'C' }
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
    const hashKey = event.hashKey;
    const nextToken = event.nextToken;
    let currentDate = moment().format();

    // Obtener matches
    getMatches(DYNAMO_TABLE_MATCHES, hashKey, currentDate, limitScan, nextToken, function(err, data) {
        if (err) console.log(err);
        else {
            // Obtener nextToken para paginacion
            let nextTokenResult = null;

            if ('LastEvaluatedKey' in data) {
                nextTokenResult = JSON.stringify(data.LastEvaluatedKey);
            }

            // Existen rivales
            if (data.Count) {
                // Quitar tipo de datos al resultado de DynamoDB
                const dataResult = data.Items.map(function(x) {
                    return AWS.DynamoDB.Converter.unmarshall(x);
                });

                callback(null, {
                    items: dataResult,
                    nextToken: nextTokenResult
                });
            }

            // No existen rivales
            else {
                callback(null, {
                    items: [],
                    nextToken: nextTokenResult
                });
            }
        }
    });
};
