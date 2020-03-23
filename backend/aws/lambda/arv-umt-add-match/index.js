// LIBRERIAS
const AWS = require('aws-sdk');
const moment = require('moment');

// PARAMETROS
const dynamodb = new AWS.DynamoDB();
const DYNAMO_TABLE_MATCHES = 'ARV_UMT_MATCHES';
const daysToExpire = 10;

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

function queryAddMatch(tableName, hashKey, rangeKey, matchId, geohash, adversaryName, adversaryPicture, createdAt, expireAt, matchStatus, matchFilter, genderFilter, ageMinFilter, ageMaxFilter, fn) {
    dynamodb.putItem({
        TableName: tableName,
        Item: {
            "hashKey": {
                S: hashKey
            },
            "rangeKey": {
                S: rangeKey
            },
            "geohash": {
                N: geohash
            },
            "adversaryName": {
                S: adversaryName
            },
            "adversaryPicture": {
                S: adversaryPicture
            },
            "matchId": {
                S: matchId
            },
            "createdAt": {
                S: createdAt
            },
            "expireAt": {
                S: expireAt
            },
            "matchStatus": {
                S: matchStatus
            },
            "matchFilter": {
                S: matchFilter
            },
            "genderFilter": {
                S: genderFilter
            },
            "ageMinFilter": {
                N: ageMinFilter
            },
            "ageMaxFilter": {
                N: ageMaxFilter
            }
        }
    }, function(err, data) {
        if (err) return fn(err);
        else fn(null, data);
    });
}

function addMatch(tableName, hashKey, rangeKey, matchId, geohash, creatorName, creatorPicture, adversaryName, adversaryPicture, createdAt, expireAt, matchStatus, matchFilter, genderFilter, ageMinFilter, ageMaxFilter, callback) {
    // Se crea primero el match para el creador
    queryAddMatch(tableName, hashKey, rangeKey, matchId, geohash, adversaryName, adversaryPicture, createdAt, expireAt, matchStatus, matchFilter, genderFilter, ageMinFilter, ageMaxFilter, function(err, data) {
        if (err) console.log(err);
        else {
            // Se crea el match para el invitado o adversario
            queryAddMatch(tableName, rangeKey, hashKey, matchId, geohash, creatorName, creatorPicture, createdAt, expireAt, matchStatus, matchFilter, genderFilter, ageMinFilter, ageMaxFilter, function(err, data) {
                if (err) console.log(err);
                else {
                    callback(null, {
                        matchId: matchId
                    });
                }
            });
        }
    });
}

// HANDLER
exports.handler = (event, context, callback) => {
    const hashKey = event.hashKey;
    const rangeKey = event.rangeKey;
    const geohash = String(event.geohash);
    const creatorName = event.creatorName;
    const creatorPicture = event.creatorPicture;
    const adversaryName = event.adversaryName;
    const adversaryPicture = event.adversaryPicture;
    const matchFilter = event.matchFilter;
    const genderFilter = event.genderFilter;
    const ageMinFilter = String(event.ageMinFilter);
    const ageMaxFilter = String(event.ageMaxFilter);
    const createdAt = moment().format();
    const expireAt = moment().add(daysToExpire, 'days').format();

    // Verificar si el match ya existe
    getMatch(DYNAMO_TABLE_MATCHES, hashKey, rangeKey, function(err, data) {
        if (err) console.log(err);
        else {
            // Existe el match
            if (Object.entries(data).length > 0 && data.constructor === Object) {
                const creatorId = data.Item.matchId.S.split('#')[0];

                // El usuario solicitante es el creador del match
                if (hashKey === creatorId) {
                    // Si el match expiro se vuelve a agregar el match
                    if (createdAt >= data.Item.expireAt.S) {
                        const matchStatus = 'P';
                        const matchId = hashKey + '#' + rangeKey;

                        addMatch(DYNAMO_TABLE_MATCHES, hashKey, rangeKey, matchId, geohash, creatorName, creatorPicture, adversaryName, adversaryPicture, createdAt, expireAt, matchStatus, matchFilter, genderFilter, ageMinFilter, ageMaxFilter, callback);
                    }

                    // Si no expiro entonces no hacer nada y devolver el matchId
                    else {
                        callback(null, {
                            matchId: data.Item.matchId.S
                        });
                    }
                }

                // El usuario solicitante es el invitado del match
                else {
                    // Si el match expiro se vuelve a agregar el match
                    if (createdAt >= data.Item.expireAt.S) {
                        const matchStatus = 'P';
                        const matchId = hashKey + '#' + rangeKey;

                        addMatch(DYNAMO_TABLE_MATCHES, hashKey, rangeKey, matchId, geohash, creatorName, creatorPicture, adversaryName, adversaryPicture, createdAt, expireAt, matchStatus, matchFilter, genderFilter, ageMinFilter, ageMaxFilter, callback);
                    }

                    // Si el estado es pendiente entonces se acepta la solicitud
                    else if (data.Item.matchStatus.S === 'P') {
                        const matchStatus = 'A';
                        const matchId = data.Item.matchId.S;
                        const geohash = data.Item.geohash.N;
                        const adversaryName = event.creatorName;
                        const adversaryPicture = event.creatorPicture;
                        const creatorName = data.Item.adversaryName.S;
                        const creatorPicture = data.Item.adversaryPicture.S;
                        const matchFilter = data.Item.matchFilter.S;
                        const genderFilter = data.Item.genderFilter.S;
                        const ageMinFilter = data.Item.ageMinFilter.N;
                        const ageMaxFilter = data.Item.ageMaxFilter.N;
                        const createdAt = data.Item.createdAt.S;
                        const expireAt = data.Item.expireAt.S;

                        addMatch(DYNAMO_TABLE_MATCHES, rangeKey, hashKey, matchId, geohash, creatorName, creatorPicture, adversaryName, adversaryPicture, createdAt, expireAt, matchStatus, matchFilter, genderFilter, ageMinFilter, ageMaxFilter, callback);
                    }

                    // En caso contrario no hacer nada
                    else {
                        callback(null, {
                            matchId: data.Item.matchId.S
                        });
                    }
                }
            }

            // Si no existe entonces agregar match
            else {
                const matchStatus = 'P';
                const matchId = hashKey + '#' + rangeKey;

                addMatch(DYNAMO_TABLE_MATCHES, hashKey, rangeKey, matchId, geohash, creatorName, creatorPicture, adversaryName, adversaryPicture, createdAt, expireAt, matchStatus, matchFilter, genderFilter, ageMinFilter, ageMaxFilter, callback);
            }
        }
    });
};
