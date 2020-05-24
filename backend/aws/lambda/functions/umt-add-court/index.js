/**
 * Agrega una cancha en AWS DynamoDB
 * @version 1.0.0
 * @author Franco Barrientos <franco.barrientos@arzov.com>
 */

const aws = require('aws-sdk');
const umt_env = require('umt-env');
const ddbGeo = require('dynamodb-geo');
const dynamodb = new aws.DynamoDB();
const config = new ddbGeo.GeoDataManagerConfiguration(dynamodb, umt_env.db.UMT_COURTS);

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

function getCourt(tableName, rangeKey, fn) {
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

function addLocation(
	tableName,
	latitude,
	longitude,
	rangeKey,
	matchType,
	name,
	website,
	email,
	phone,
	information,
	benefits,
	schedule,
	payCondition,
	prices,
	partner,
	active,
	callback
) {
	myGeoTableManager.putPoint({
			RangeKeyValue: { S: rangeKey },
			GeoPoint: {
				latitude: latitude,
				longitude: longitude
			},
			PutItemInput: {
				Item: {
					matchType: { SS: matchType },
					name: { S: name },
					website: { S: website },
					email: { SS: email },
					phone: { SS: phone },
					information: { S: information },
					benefits: { S: benefits },
					schedule: { S: schedule },
					payCondition: { S: payCondition },
					prices: { S: prices },
					partner: { BOOL: partner },
					active: { BOOL: active }
				}
			}
		}).promise()
		.then(function() {
			getCourt(tableName, rangeKey, function(err, data) {
				if (err) console.log(err);
				else {
					const result = data.Items[0];

					callback(null, {
						hashKey: result.hashKey.N,
						rangeKey: result.rangeKey.S,
						geoJson: JSON.parse(result.geoJson.S).coordinates,
						matchType: result.matchType.SS,
						name: result.name.S,
						website: result.website.S,
						email: result.email.SS,
						phone: result.phone.SS,
						information: result.information.S,
						benefits: result.benefits.S,
						schedule: result.schedule.S,
						payCondition: result.payCondition.S,
						prices: result.prices.S,
						partner: result.partner.BOOL,
						active: result.active.BOOL,

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
	const rangeKey = event.rangeKey;
	const matchType = event.matchType;
	const name = event.name;
	const website = event.website;
	const email = event.email;
	const phone = event.phone;
	const information = event.information;
	const benefits = event.benefits;
	const schedule = event.schedule;
	const payCondition = event.payCondition;
	const prices = event.prices;
	const partner = event.partner;
	const active = event.active;

	console.log(event);

	// Revisar si exite una ubicacion para la cancha
	getCourt(umt_env.db.UMT_COURTS, rangeKey, function(err, data) {
		if (err) console.log(err);
		else {
			// La ubicacion existente se elimina y se reemplaza por la nueva
			if (data.Count) {
				const hashKey = data.Items[0].hashKey.N;

				deleteLocation(umt_env.db.UMT_COURTS, hashKey, rangeKey, function(err, data) {
					if (err) console.log(err);
					else {
						addLocation(
							umt_env.db.UMT_COURTS,
							latitude,
							longitude,
							rangeKey,
							matchType,
							name,
							website,
							email,
							phone,
							information,
							benefits,
							schedule,
							payCondition,
							prices,
							partner,
							active,
							callback
						);
					}
				});
			}
			// Si no existe se crea la nueva ubicacion
			else {
				addLocation(
					umt_env.db.UMT_COURTS,
					latitude,
					longitude,
					rangeKey,
					matchType,
					name,
					website,
					email,
					phone,
					information,
					benefits,
					schedule,
					payCondition,
					prices,
					partner,
					active,
					callback
				);
			}
		}
	});
};
