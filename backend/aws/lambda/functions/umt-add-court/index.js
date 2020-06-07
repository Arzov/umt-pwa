/**
 * Agrega una cancha en AWS DynamoDB
 * @version 1.0.0
 * @author Franco Barrientos <franco.barrientos@arzov.com>
 */

const aws = require('aws-sdk');
const ddbGeo = require('dynamodb-geo');
const dql = require('utils/dql');
const dynamodb = new aws.DynamoDB();
const config = new ddbGeo.GeoDataManagerConfiguration(dynamodb, process.env.DB_UMT_COURTS);

config.hashKeyLength = 6;

const geoTableManager = new ddbGeo.GeoDataManager(config);


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

	// Revisar si exite una ubicacion para la cancha
	dql.getCourt(dynamodb, process.env.DB_UMT_COURTS, rangeKey, function(err, data) {
		if (err) callback(err);
		else {
			// La ubicacion existente se elimina y se reemplaza por la nueva
			if (data.Count) {
				const hashKey = data.Items[0].hashKey.N;

				dql.deleteLocation(dynamodb, process.env.DB_UMT_COURTS, hashKey, rangeKey,
					function(err, data) {
					if (err) callback(err);
					else {
						dql.addLocation(dynamodb, geoTableManager, process.env.DB_UMT_COURTS, latitude,
							longitude, rangeKey, matchType, name, website, email, phone, information,
							benefits, schedule, payCondition, prices, partner, active, callback
						);
					}
				});
			}
			// Si no existe se crea la nueva ubicacion
			else {
				dql.addLocation(dynamodb, geoTableManager, process.env.DB_UMT_COURTS, latitude, longitude,
					rangeKey, matchType, name, website, email, phone, information, benefits, schedule,
					payCondition, prices, partner, active, callback
				);
			}
		}
	});
};
