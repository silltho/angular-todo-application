var Datastore = require('nedb');
var express = require('express');
var bCrypt = require('bcrypt-nodejs');
var passport = require('passport');

var UserService = require('../service/user-service');
var PassportStrategies = require('../passport/passport-strategies');
var UserDAO = require('../dao/user-dao');
var User = require('../model/user');
var Router = require('../routes/routes');
var initPassport = require('../passport/passport-init');

module.exports = function Test() {

	this.app = express();
	this.db = new Datastore({ autoload: true });
	this.userDAO = new UserDAO(this.db);
	this.userService = new UserService(this.userDAO, passport);
	this.passportStrategies = new PassportStrategies(this.userDAO);
	this.router = new Router(this.app, passport, this.userService);

	initPassport(passport, this.passportStrategies);

	this.generatedUser = {
		username: 'test-username1',
		password: 'test-password1',
		firstName: 'test-firstname1',
		lastName: 'test-lastname1',
		email: 'test-email1'
	};

	var req = {body: this.generatedUser};

	this.passportStrategies.signup(req, req.body.username, req.body.password, function(err, createdUser) {
		if(err) {
			console.error(err);
		}
	});

	this.createTestUser = function(){
		var testUser = new User('test-username', this.createHash('test-password'), 'test-firstname', 'test-lastname', 'test-email');
		testUser.createTodo('description');
		return testUser;
	}

	this.createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
	}

	this.isValidPassword = function(storedPassword, password){
		return bCrypt.compareSync(password, storedPassword);
	}

	function loginUser() {
	return function(done) {
		server
			.post('/login')
			.send()
			.expect(302)
			.expect('Location', '/')
			.end(function() {
				if (err) {
					return done(err);
				}
				return done();
			});

		}
	};
};