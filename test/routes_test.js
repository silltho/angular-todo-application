var should = require('should');
var request = require('supertest')

var router = require('../routes/routes');

describe('Routes Tests', function() {

	it('should render index.ejs', function(done) {
		request(router)
			.get('/')
			.expect(200, done);
	});

	/*it('should signup user', function() {
		debugger;
		request(router)
			.post('/signup')
			.expect(400);
	});*/
});