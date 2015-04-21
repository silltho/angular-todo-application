var Datastore = require('nedb');
var bCrypt = require('bcrypt-nodejs');

var UserService = require('../service/user-service');
var PassportStrategies = require('../passport/passport-strategies');
var UserDAO = require('../dao/user-dao');
var User = require('../model/user');

module.exports = function Test() {

	this.db = new Datastore({ autoload: true });
	this.userDAO = new UserDAO(this.db);
	this.userService = new UserService(this.userDAO);
	this.passportStrategies = new PassportStrategies(this.userDAO);

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
};