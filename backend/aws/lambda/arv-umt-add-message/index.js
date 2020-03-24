// LIBRERIAS
const AWS = require('aws-sdk');
const moment = require('moment');

// PARAMETROS CONFIGURACION
const dynamodb = new AWS.DynamoDB();
const DYNAMO_TABLE_MESSAGES = 'ARV_UMT_MESSAGES';

// FUNCIONES
function addMessage(tableName, hashKey, rangeKey, author, authorName, content, fn) {
	dynamodb.putItem({
		TableName: tableName,
		Item: {
			"hashKey": {
				S: hashKey
			},
			"rangeKey": {
				S: rangeKey
			},
			"author": {
				S: author
			},
			"authorName": {
				S: authorName
			},
			"content": {
				S: content
			}
		}
	}, function(err, data) {
		if (err) return fn(err);
		else fn(null, data);
	});
}

// HANDLER
exports.handler = function(event, context, callback) {
	// Parametros del usuario
	const hashKey = event.hashKey;
	const author = event.author;
	const authorName = event.authorName;
	const content = event.content;
	const rangeKey = moment().format() + '#' + author;

	// Agregar mensaje
	addMessage(DYNAMO_TABLE_MESSAGES, hashKey, rangeKey, author, authorName, content, function(err, data) {
		if (err) console.log(err);
		else {
			callback(null, {
				hashKey,
				rangeKey,
				author,
				authorName,
content
			});
		}
	});

};
