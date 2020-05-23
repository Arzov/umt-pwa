// LIBRERIAS
const AWS = require('aws-sdk');

// PARAMETROS
const dynamodb = new AWS.DynamoDB();
const DYNAMO_TABLE_MATCHES = 'ARV_UMT_MATCHES';

// FUNCIONES
function getMatch(tableName, hashKey, rangeKey, fn) {
    dynamodb.getItem({
            "TableName": tableName,
            "Key": {
                "hashKey": { "S": hashKey },
                "rangeKey": { "S": rangeKey }
            }
        },
        function(err, data) {
            if (err) return fn(err);
            else fn(null, data);
        });
}

function queryUpdateMatch(tableName, hashKey, rangeKey, matchStatus, fn) {
    dynamodb.updateItem({
            TableName: tableName,
            Key: {
                "hashKey": {
                    S: hashKey
                },
                "rangeKey": {
                    S: rangeKey
                }
            },
            UpdateExpression: "set matchStatus = :v1",
            ExpressionAttributeValues: {
                ":v1": {
                    S: matchStatus
                }
            }
        },
        function(err, data) {
            if (err) return fn(err);
            else fn(null, data);
        });
}

function updateMatch(tableName, hashKey, rangeKey, creatorStatus, adversaryStatus, isCreator, callback) {
    // Se actualiza primero el match para el creador
    queryUpdateMatch(tableName, hashKey, rangeKey, creatorStatus, function(err, data) {
        if (err) console.log(err);
        else {
            // Se actualiza el match para el invitado o adversario
            queryUpdateMatch(tableName, rangeKey, hashKey, adversaryStatus, function(err, data) {
                if (err) console.log(err);
                else {
                    // Devolver el id del adversario segun corresponda para notificar en la suscripcion App
                    if (isCreator) {
                        callback(null, {
                            rangeKey: rangeKey
                        });
                    }
                    else {
                        callback(null, {
                            rangeKey: hashKey
                        });
                    }
                }
            });
        }
    });
}

// HANDLER
exports.handler = (event, context, callback) => {
    const hashKey = event.hashKey;
    const rangeKey = event.rangeKey;
    const matchId = event.matchId;
    const userStatus = event.userStatus;
    const creatorId = matchId.split('#')[0];

    // Obtener informacion del match
    getMatch(DYNAMO_TABLE_MATCHES, hashKey, rangeKey, function(err, data) {
        if (err) console.log(err);
        else {
            // El usuario solicitante es el creador del match
            if (hashKey === creatorId) {
                const isCreator = true;

                // El usuario rival cancelo el match
                if (data.Item.matchStatus.S === 'D') {
                    // El creador solo puede cancelar el match
                    const creatorStatus = 'C';
                    const adversaryStatus = 'C';

                    updateMatch(DYNAMO_TABLE_MATCHES, hashKey, rangeKey, creatorStatus, adversaryStatus, isCreator, callback);
                }

                // El match sigue pendiente
                else {
                    // El creador solo puede cancelar el match
                    const creatorStatus = 'C';
                    const adversaryStatus = 'D';

                    updateMatch(DYNAMO_TABLE_MATCHES, hashKey, rangeKey, creatorStatus, adversaryStatus, isCreator, callback);
                }
            }

            // El usuario solicitante es el invitado del match
            else {
                const isCreator = false;

                switch (userStatus) {

                    // El usuario acepta la solicitud
                    case 'A':
                        // El usuario creador cancelo el match
                        if (data.Item.matchStatus.S === 'D') {
                            // No actualizar nada y devolver el estado rechazado
                            callback(null, {
                                matchStatus: 'D'
                            });
                        }

                        // El match sigue pendiente
                        else {
                            // Match aceptado por ambas partes
                            const creatorStatus = 'A';
                            const adversaryStatus = 'A';

                            updateMatch(DYNAMO_TABLE_MATCHES, rangeKey, hashKey, creatorStatus, adversaryStatus, isCreator, callback);
                        }
                        break;

                        // El usuario rechaza la solicitud
                    case 'D':
                        // El usuario creador cancelo el match
                        if (data.Item.matchStatus.S === 'D') {
                            // Se debe cancelar el match en su totalidad
                            const creatorStatus = 'C';
                            const adversaryStatus = 'C';

                            updateMatch(DYNAMO_TABLE_MATCHES, rangeKey, hashKey, creatorStatus, adversaryStatus, isCreator, callback);
                        }

                        // El match sigue pendiente
                        else {
                            // Se notifica al creador que el match es rechazado y se cancela por parte del adversario
                            const creatorStatus = 'D';
                            const adversaryStatus = 'C';

                            updateMatch(DYNAMO_TABLE_MATCHES, rangeKey, hashKey, creatorStatus, adversaryStatus, isCreator, callback);
                        }
                        break;

                        // El usuario cancelo la solicitud (solo puede dar esta opcion cuando el creador cancelo el match)
                    case 'C':
                        // Se debe cancelar el match en su totalidad
                        const creatorStatus = 'C';
                        const adversaryStatus = 'C';

                        updateMatch(DYNAMO_TABLE_MATCHES, rangeKey, hashKey, creatorStatus, adversaryStatus, isCreator, callback);
                        break;
                }
            }
        }
    });
};
