var should = require('should');
var request = require('supertest')

var router = require('../routes/routes');

describe('Routes Tests', function() {

	it('should render index.ejs', function(done) {
		request(router)
			.get('/')
			.expect(200)
			.end(function(err, res){
				console.log('1111');
				if (err) return done(err);
				done();
			});
	});
});