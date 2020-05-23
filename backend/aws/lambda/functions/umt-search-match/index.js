// LIBRERIAS
const AWS = require('aws-sdk');
const moment = require('moment');
const async = require('async');

// PARAMETROS CONFIGURACION
const dynamodb = new AWS.DynamoDB();
const DYNAMO_TABLE_USERS = 'ARV_USERS';
const DYNAMO_TABLE_UMATCH_USERS = 'ARV_UMT_USERS';
const DYNAMO_TABLE_UMATCH_MATCHES = 'ARV_UMT_MATCHES';
const limitScan = 5;

// FUNCIONES
function getUmatchUsers(hashKey, age, gender, matchFilter, nextToken, fn) {
	if (nextToken) {
		dynamodb.query({
			"TableName": DYNAMO_TABLE_UMATCH_USERS,
			"KeyConditionExpression": "hashKey = :v1",
			"FilterExpression": "ageMinFilter <= :v2 and ageMaxFilter >= :v2 and genderFilter = :v3 and matchFilter = :v4",
			"ExpressionAttributeValues": {
				":v1": { "N": hashKey },
				":v2": { "N": age },
				":v3": { "S": gender },
				":v4": { "S": matchFilter }
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
			"TableName": DYNAMO_TABLE_UMATCH_USERS,
			"KeyConditionExpression": "hashKey = :v1",
			"FilterExpression": "ageMinFilter <= :v2 and ageMaxFilter >= :v2 and genderFilter = :v3 and matchFilter = :v4",
			"ExpressionAttributeValues": {
				":v1": { "N": hashKey },
				":v2": { "N": age },
				":v3": { "S": gender },
				":v4": { "S": matchFilter }
			},
			"Limit": limitScan
		}, function(err, data) {
			if (err) return fn(err);
			else fn(null, data);
		});
	}
}

function getUser(hashKey, fn) {
	dynamodb.getItem({
			"TableName": DYNAMO_TABLE_USERS,
			"Key": {
				"hashKey": { "S": hashKey }
			}
		},
		function(err, data) {
			if (err) return fn(err);
			else fn(null, data);
		});
}

function getMatch(hashKey, rangeKey, currentDate, fn) {
	dynamodb.query({
		"TableName": DYNAMO_TABLE_UMATCH_MATCHES,
		"KeyConditionExpression": "hashKey = :v1 and rangeKey = :v2",
		"FilterExpression": "expireAt >= :v3",
		"ExpressionAttributeValues": {
			":v1": { "S": hashKey },
			":v2": { "S": rangeKey },
			":v3": { "S": currentDate }
		}
	}, function(err, data) {
		if (err) return fn(err);
		else fn(null, data);
	});
}

function getAge(dateString) {
	var birthday = +new Date(dateString);
	return ~~((Date.now() - birthday) / (31557600000));
}

function validateUser(calls, hashKey, geoJson, ageMinFilter, ageMaxFilter, genderFilter, userId, currentDate) {
	calls.push(function(callback) {
		// Revisar si ya existe un match entre los usuarios
		getMatch(userId, hashKey, currentDate, function(err, data) {
			if (err) return callback(err);
			else {
				// Si no existe match seguir con la validacion
				if (!data.Count) {
					// Obtener informacion del usuario encontrado
					getUser(hashKey, function(err, data) {
						if (err) return callback(err);
						else {
							const age = getAge(data.Item.birthdate.S);

							// Validar que los datos del usuario coincidan con los filtros
							if (data.Item.gender.S == genderFilter && age >= ageMinFilter && age <= ageMaxFilter) {
								callback(null, {
									hashKey: hashKey,
									firstName: data.Item.firstName.S,
									age: age,
									picture: data.Item.picture.S,
									geoJson: JSON.parse(geoJson).coordinates
								});
							}
							else {
								callback(null);
							}
						}
					});
				}
				else {
					callback(null);
				}
			}
		});
	});
}


// HANDLER
exports.handler = function(event, context, callback) {
	const hashKey = event.hashKey;
	const rangeKey = event.rangeKey;
	const birthdate = event.birthdate;
	const gender = event.gender;
	const ageMinFilter = String(event.ageMinFilter);
	const ageMaxFilter = String(event.ageMaxFilter);
	const genderFilter = event.genderFilter;
	const matchFilter = event.matchFilter;
	let nextToken = event.nextToken;
	const age = String(getAge(birthdate));
	const currentDate = moment().format();

	// El hashKey del nextToken debe ser igual al hashKey del usuario, en caso que no sea se anula el nextToken,
	// de esta manera se evita que dynamoDB no pueda encontrar la particion correcta
	if (nextToken) {
		if (Number(JSON.parse(nextToken).hashKey.N) !== Number(hashKey)) {
			nextToken = null;
		}
	}

	// Tareas asincronicas
	let calls = [];

	// Buscar usuarios donde sus filtros coincidan con la edad, sexo y tipo de match del usuario buscador
	getUmatchUsers(hashKey, age, gender, matchFilter, nextToken, function(err, data) {
		if (err) console.log(err);
		else {
			let nextTokenResult = null;

			if ('LastEvaluatedKey' in data) {
				nextTokenResult = JSON.stringify(data.LastEvaluatedKey);
			}

			// Validar usuarios encontrados en cuanto a edad y sexo
			for (let i = 0; i < data.Count; i++) {
				// Revisar que el usuario no sea el mismo
				if (rangeKey !== data['Items'][i]['rangeKey']['S']) {
					validateUser(calls, data['Items'][i]['rangeKey']['S'], data['Items'][i]['geoJson']['S'], ageMinFilter, ageMaxFilter, genderFilter, rangeKey, currentDate);
				}
			}

			// Espera que valide a los usuarios
			async.parallel(calls, function(err, result) {
				if (err) console.log(err);
				else {
					const data = result.filter(function(el) {
						return el != null;
					});

					callback(null, {
						items: data,
						nextToken: nextTokenResult
					});
				}
			});
		}
	});
};
