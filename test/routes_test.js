var should = require('should');
var request = require('supertest')
var express = require('express');
var router = require('../routes/routes');
var app = express();

before(function() {
	app.use(router);
});

describe('Routes Tests', function() {
	/*it('should render index.ejs', function(done) {
		request(app)
			.get('/')
			.expect(200, done);
	});*/

	/*it('should signup user', function(done) {
		request(router)
			.post('/signup')
			.expect(200, done);
	});*/
});