const aws = require('aws-sdk')
const event = require('../events/event.json')


test('Ejecución AWS Lambda: umt-add-court', (done) => {
  let lambda = new aws.Lambda({
    apiVersion: '2015-03-31',
    region: 'us-east-2',
    endpoint: 'http://127.0.0.1:3001',
    sslEnabled: false
  })

  let params = {
    FunctionName: 'umt-add-court',
    Payload: JSON.stringify(event)
  }

  lambda.invoke(params, function(err, data) {
    if (err) {
      console.log(err)
      expect(err.StatusCode).toBe(200)
    }
    else {
      console.log(data)
      expect(data.StatusCode).toBe(200)
    }

    done()
  })
})