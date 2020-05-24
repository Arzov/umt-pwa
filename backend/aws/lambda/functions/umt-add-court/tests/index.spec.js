'use strict';

var AWS = require('aws-sdk');
const app = require('../index.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;

describe('Tests index', function () {
    var lambda = new AWS.Lambda({
        apiVersion: '2015-03-31',
        region: 'us-east-2',
        endpoint: 'http://127.0.0.1:3001',
        sslEnabled: false
    });

    it('verifies successful response', async () => {
        // const result = await app.Handler(event, context)

        var params = {
            FunctionName: 'UMTAddCourt1', /* required */
          };

          lambda.invoke(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
          });

        // expect(result).to.be.an('object');
        // expect(result.statusCode).to.equal(200);
        // expect(result.body).to.be.an('string');

        // let response = JSON.parse(result.body);

        // expect(response).to.be.an('object');
        // expect(response.message).to.be.equal("hello world");
        // expect(response.location).to.be.an("string");
    });
});