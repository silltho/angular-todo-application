var PrettyStream = require('bunyan-prettystream');
var prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);
var log = require('bunyan').createLogger({
	name: 'todo-applikation-tests',
	streams: [{
		type: 'raw',
		stream: prettyStdOut
	}]
});
var Datastore = require('nedb');
var express = require('express');
var bCrypt = require('bcrypt-nodejs');
var passport = require('passport');
var request = require('supertest');
var should = require('should');

var UserService = require('../service/user-service');
var PassportStrategies = require('../passport/passport-strategies');
var UserDAO = require('../dao/user-dao');
var User = require('../model/user');
var Router = require('../routes/routes');
var initPassport = require('../passport/passport-init');
var TodoApplication = require('../app.js');

module.exports = function Test() {

	var testUserCount = 0;
	this.db = new Datastore({
		autoload: true
	});
	this.app = new TodoApplication(this.db, log);
	this.userDAO = this.app.userDAO;
	this.userService = this.app.userService;
	this.passportStrategies = this.app.passportStrategies;
	this.router = this.app.router;
	this.server = request.agent(this.app.app);

	this.createTestUser = function () {
		var testUser = new User('test-username' + testUserCount, 'password',
			'test-firstname' + testUserCount, 'test-lastname' + testUserCount,
			'test-email' + testUserCount);
		testUser.createTodo('description');
		testUser._id = 'test-_id' + testUserCount;
		testUserCount++;
		return testUser;
	};

	this.signupTestUser = function (testUser, done) {
		var req = {
			body: testUser
		};

		this.app.passportStrategies.signup(req, testUser.username, testUser.password,
			function (err, createdUser) {
				if (err) {
					return done(err);
				}
				return done(null, createdUser);
			});
	};

	this.loginUser = function (done) {
		var createUser = this.createTestUser();
		var testUser = JSON.parse(JSON.stringify(createUser));
		var server = this.server;

		this.app.userDAO.createUser(createUser, function (err, createdUser) {
			server
				.post('/login')
				.send(testUser)
				.end(function (err, res) {
					should.not.exist(err);
					res.status.should.eql(200);
					done(testUser);
				});
		});
	}
};