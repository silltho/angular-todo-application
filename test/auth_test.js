var should = require('should');
var sinon = require('sinon');
var login = require('../passport/login');
var signup = require('../passport/signup');

describe('Authentication Tests', function() {
	it('should signup user', function(done) {
		var req = {};
		var res = {};

		signup(req, 'username', 'password', function() {
		});

		done();
	})
});