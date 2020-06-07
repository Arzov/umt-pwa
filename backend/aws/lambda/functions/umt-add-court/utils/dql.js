/**
 * Queries sobre AWS DynamoDB
 * @version 1.0.0
 * @author Franco Barrientos <franco.barrientos@arzov.com>
 */


/**
 * Elimina la ubicación de la cancha
 * @param {Object} db Conexion a DynamoDB
 * @param {String} tableName Nombre de la tabla
 * @param {String} hashKey Geohash de la cancha
 * @param {String} rangeKey Id de la cancha
 * @param {Function} fn Función callback
 */
const deleteLocation = (db, tableName, hashKey, rangeKey, fn) => {
    db.deleteItem({
        TableName: tableName,
        Key: {
            "hashKey": { "N": hashKey },
            "rangeKey": { "S": rangeKey }
        }
    }, function(err, data) {
        if (err) return fn(err);
        else fn(null, data);
    });
}

/**
 * Obtiene información de la cancha
 * @param {Object} db Conexion a DynamoDB
 * @param {String} tableName Nombre de la tabla
 * @param {String} rangeKey Id de la cancha
 * @param {Function} fn Función callback
 */
const getCourt = (db, tableName, rangeKey, fn) => {
    db.query({
        TableName: tableName,
        IndexName: "rangeKey-index",
        KeyConditionExpression: "rangeKey = :v1",
        ExpressionAttributeValues: { ":v1": { "S": rangeKey } }
    }, function(err, data) {
        if (err) return fn(err);
        else fn(null, data);
    });
}

/**
 * Agrega una cancha con su geolocalización
 * @param {Object} db Conexion a DynamoDB
 * @param {Object} geoTableManager GeoDataManager para agregar geolocalización en DynamoDB
 * @param {String} tableName Nombre de la tabla
 * @param {String} latitude Latitud de la ubicación
 * @param {String} longitude Longitud de la ubicación
 * @param {String} rangeKey Id de la cancha
 * @param {String[]} matchType Tipo de canchas que maneja (5v5, 7v7, 11v11)
 * @param {String} name Nombre de la cancha
 * @param {String} website Sitio web
 * @param {String[]} email Emails de contacto
 * @param {String[]} phone Números telefónicos de contacto
 * @param {String} information Información adicional de las canchas
 * @param {String} benefits Servicios adicionales del establecimiento (duchas, estacionamiento, etc.)
 * @param {String} schedule Horarios de atención
 * @param {String} payCondition Condiciones de pagos y reservas
 * @param {String} prices Precios de las canchas
 * @param {Boolean} partner Cancha asociada a Umatch
 * @param {String} active Vigencia de la cancha
 * @param {Function} fn Función callback
 */
const addLocation = (db, geoTableManager, tableName, latitude, longitude, rangeKey, matchType, name, website,
	email, phone, information, benefits, schedule, payCondition, prices, partner, active, callback) => {
    geoTableManager.putPoint({
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
			getCourt(db, tableName, rangeKey, function(err, data) {
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
						active: result.active.BOOL
					});
				}
			});
		});
}

module.exports.deleteLocation = deleteLocation;
module.exports.getCourt = getCourt;
module.exports.addLocation = addLocation;