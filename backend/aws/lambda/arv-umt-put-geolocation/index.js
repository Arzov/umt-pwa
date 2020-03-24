// LIBRERIAS
const AWS = require('aws-sdk');
const ddbGeo = require('dynamodb-geo');

// PARAMETROS CONFIGURACION
const dynamodb = new AWS.DynamoDB();
const DYNAMO_TABLE_USERS = 'ARV_UMT_USERS';
const config = new ddbGeo.GeoDataManagerConfiguration(dynamodb, DYNAMO_TABLE_USERS);

config.hashKeyLength = 6;

const myGeoTableManager = new ddbGeo.GeoDataManager(config);

// FUNCIONES
function deleteLocation(tableName, hashKey, rangeKey, fn) {
	dynamodb.deleteItem({
		"TableName": tableName,
		"Key": {
			"hashKey": {
				"N": hashKey
			},
			"rangeKey": {
				"S": rangeKey
			}
		}
	}, function(err, data) {
		if (err) return fn(err);
		else fn(null, data);
	});
}

function getUser(tableName, rangeKey, fn) {
	dynamodb.query({
		"TableName": tableName,
		"IndexName": "rangeKey-index",
		"KeyConditionExpression": "rangeKey = :v1",
		"ExpressionAttributeValues": {
			":v1": { "S": rangeKey }
		}
	}, function(err, data) {
		if (err) return fn(err);
		else fn(null, data);
	});
}

function addLocation(tableName, userId, latitude, longitude, genderFilter, ageMinFilter, ageMaxFilter, matchFilter, callback) {
	myGeoTableManager.putPoint({
			RangeKeyValue: { S: userId },
			GeoPoint: {
				latitude: latitude,
				longitude: longitude
			},
			PutItemInput: {
				Item: {
					genderFilter: { S: genderFilter },
					ageMinFilter: { N: ageMinFilter },
					ageMaxFilter: { N: ageMaxFilter },
					matchFilter: { S: matchFilter }
				}
			}
		}).promise()
		.then(function() {
			getUser(tableName, userId, function(err, data) {
				if (err) console.log(err);
				else {
					const result = data.Items[0];

					callback(null, {
						hashKey: result.hashKey.N,
						rangeKey: result.rangeKey.S,
						geoJson: JSON.parse(result.geoJson.S).coordinates,
						genderFilter: result.genderFilter.S,
						ageMinFilter: result.ageMinFilter.N,
						ageMaxFilter: result.ageMaxFilter.N,
						matchFilter: result.matchFilter.S
					});
				}
			});
		});
}

// HANDLER
exports.handler = function(event, context, callback) {
	// Parametros del usuario
	const latitude = event.latitude;
	const longitude = event.longitude;
	const userId = event.userId;
	const genderFilter = event.genderFilter;
	const ageMinFilter = String(event.ageMinFilter);
	const ageMaxFilter = String(event.ageMaxFilter);
	const matchFilter = event.matchFilter;

	// Revisar si exite una ubicacion para el usuario
	getUser(DYNAMO_TABLE_USERS, userId, function(err, data) {
		if (err) console.log(err);
		else {
			// La ubicacion existente se elimina y se reemplaza por la nueva
			if (data.Count) {
				const hashKey = data.Items[0].hashKey.N;

				deleteLocation(DYNAMO_TABLE_USERS, hashKey, userId, function(err, data) {
					if (err) console.log(err);
					else {
						addLocation(DYNAMO_TABLE_USERS, userId, latitude, longitude, genderFilter, ageMinFilter, ageMaxFilter, matchFilter, callback);
					}
				});
			}
			// Si no existe se crea la nueva ubicacion
			else {
				addLocation(DYNAMO_TABLE_USERS, userId, latitude, longitude, genderFilter, ageMinFilter, ageMaxFilter, matchFilter, callback);
			}
		}
	});
};
