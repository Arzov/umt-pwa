// LIBRERIAS
const AWS = require('aws-sdk');

// PARAMETROS CONFIGURACION
const dynamodb = new AWS.DynamoDB();
const DYNAMO_TABLE_UMT_USERS = 'ARV_UMT_USERS';

// FUNCIONES
function updateUser(tableName, hashKey, rangeKey, genderFilter, ageMinFilter, ageMaxFilter, matchFilter, fn) {
    dynamodb.updateItem({
        "TableName": tableName,
        "Key": {
            "hashKey": {
                "N": hashKey
            },
            "rangeKey": {
                "S": rangeKey
            }
        },
        "UpdateExpression": "set genderFilter = :v1, ageMinFilter = :v2, ageMaxFilter = :v3, matchFilter = :v4",
        "ExpressionAttributeValues": {
            ":v1": { "S": genderFilter },
            ":v2": { "N": ageMinFilter },
            ":v3": { "N": ageMaxFilter },
            ":v4": { "S": matchFilter }
        }
    }, function(err, data) {
        if (err) { return fn(err); }
        else { fn(null); }
    });
}

// HANDLER
exports.handler = function(event, context, callback) {
    const hashKey = event.hashKey;
    const rangeKey = event.rangeKey;
    const genderFilter = event.genderFilter;
    const ageMinFilter = String(event.ageMinFilter);
    const ageMaxFilter = String(event.ageMaxFilter);
    const matchFilter = event.matchFilter;

    updateUser(DYNAMO_TABLE_UMT_USERS, hashKey, rangeKey, genderFilter, ageMinFilter, ageMaxFilter, matchFilter, function(err, data) {
        if (err) console.log(err);
        else {
            callback(null, {
                hashKey
            });
        }
    });
};
