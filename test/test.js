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

module.exports = function Test() {

	var testUserCount = 0;

	this.app = express();
	this.db = new Datastore({ autoload: true });
	this.userDAO = new UserDAO(this.db);
	this.userService = new UserService(this.userDAO, passport);
	this.passportStrategies = new PassportStrategies(this.userDAO);
	this.router = new Router(this.app, passport, this.userService);
	this.server = request.agent(this.app);

	initPassport(passport, this.passportStrategies);

	/*this.generatedUser = {
		username: 'test-username1',
		password: 'test-password1',
		firstName: 'test-firstname1',
		lastName: 'test-lastname1',
		email: 'test-email1',
	};

	var req = {body: this.generatedUser};

	this.passportStrategies.signup(req, req.body.username, req.body.password, function(err, createdUser) {
		if(err) {
			console.error(err);
		}
	});*/

	this.createTestUser = function(){
		var testUser = new User(
			'test-username'+testUserCount, 
			this.createHash('test-password'), 
			'test-firstname'+testUserCount, 
			'test-lastname'+testUserCount, 
			'test-email'+testUserCount
		);
		testUser.createTodo('description');
		//testUser._id = 'test-_id'+testUserCount
		testUserCount++;
		debugger;
		return testUser;
	}

	this.createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
	}

	this.isValidPassword = function(storedPassword, password){
		return bCrypt.compareSync(password, storedPassword);
	}

	this.loginUser = function(done) {
		this.server.post('/login')
			.send(this.generatedUser)
			.end(function(err,res) {
				should.not.exist(err);
				res.status.should.eql(200)
				done();
			});
	}

	this.userDAO.createUser(this.createTestUser(), function(err, createdUser) {
	});
	
};