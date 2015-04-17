var should = require('should');
var sinon = require('sinon');
var Database = require('../db/Database');
var userService = require('../service/user_service');

describe('Service Tests', function() {

	describe('User Tests', function() {
		it("should signup user", function() {
			var req = {user: {username:'testUser'}}
			var res = {};
			var spy = res.sendStatus = sinon.spy();

			userService.signup(req, res);
			spy.calledOnce.should.be.true;
		});

		it("should login user", function() {
			var req = {user: {username:'testUser'}}
			var res = {};
			var spy = res.sendStatus = sinon.spy();

			userService.login(req, res);
			spy.calledOnce.should.be.true;
		});

		it("should check login of user", function() {
			var req = {user: {username:'testUser'}}
			var res = {};
			var spy = res.sendStatus = sinon.spy();

			req.isAuthenticated = function() {
				return true;
			};

			userService.loginCheck(req, res);
			spy.calledOnce.should.be.true;
			spy.args.should.be.eql([[200]]);
		});
	});
});