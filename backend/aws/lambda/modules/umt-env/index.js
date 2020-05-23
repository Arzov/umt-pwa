/**
 * Variables de entorno para funciones AWS Lambda
 * @version 1.0.0
 * @author Franco Barrientos <franco.barrientos@arzov.com>
 */


// AWS DynamoDB
const db = {
    UMT_COURTS: 'UMT_COURTS',
    UMT_MATCHES: 'UMT_MATCHES',
    UMT_MESSAGES: 'UMT_MESSAGES',
    UMT_USERS: 'UMT_USERS'
}

module.exports.db = Object.create(db)