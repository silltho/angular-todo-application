var Datastore = require('nedb');
var should = require('should');
var sinon = require('sinon');

var Test = require('./test');
var test = {};

beforeEach(function() {
	test = new Test();
});

describe('Authentication Tests', function() {
	it('should signup user', function(done) {
		var req = {
			username: 'test-username',
			password: 'test-password',
			firstname: 'test-firstname',
			lastname: 'test-lastname',
			email: 'test-email'
		};

		test.passportStrategies.signup(req, function(err, signupUser) {
			should.not.exist(err);
			signupUser.username.should.be.eql(req.username);
			done();
		});
	})

	it('should login user', function(done) {
		var req = {
			username: 'test-username',
			password: 'test-password',
			firstname: 'test-firstname',
			lastname: 'test-lastname',
			email: 'test-email'
		};
		
		test.db.find = sinon.stub().yields(null, [test.createTestUser()]);

		test.passportStrategies.login(req, function(err, loginUser) {
			should.not.exist(err);
			loginUser.username.should.be.eql(req.username);
			done();
		});
	})
});