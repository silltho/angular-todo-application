var should = require('should');

var Test = require('./test');
var test = {};

describe('Authentication Tests', function() {
	beforeEach(function() {
		test = new Test();
	});
	
	it('should signup user', function(done) {
		var req = {
			body: test.createTestUser()
		};

		test.passportStrategies.signup(req, req.body.username, req.body.password, function(err, signupUser) {
			should.not.exist(err);
			signupUser.username.should.be.eql(req.body.username);
			done();
		});
	});

	it('should login user', function(done) {
		var testUser = test.createTestUser();
		test.signupTestUser(testUser, function (err, signupTestUser) {
			var req = {
				body: signupTestUser
			};

			req.body.password = 'password';

			test.passportStrategies.login(req, req.body.username, req.body.password, function (err, loginUser) {
				should.not.exist(err);
				loginUser.username.should.be.eql(req.body.username);
				done();
			});
		});
	})
});