var bCrypt = require('bcrypt-nodejs');
var should = require('should');
var User = require('../model/user.js');

module.exports = function PassportStrategies(userDAO) {
	userDAO.should.be.ok;
	var userDAO = userDAO;

	this.signup = function(req, username, password, done) {
		req.body.username.should.be.ok;
		req.body.password.should.be.ok;
		req.body.firstName.should.be.ok;
		req.body.lastName.should.be.ok;
		req.body.email.should.be.ok;
		done.should.be.a.function;
		userDAO.createUser.should.be.a.function;

		process.nextTick(function() {
			console.log('check signup credentials in passport/passport-strategies.js#signup');
			var newUser = new User(
				req.body.username, 
				createHash(req.body.password), 
				req.body.firstName, 
				req.body.lastName, 
				req.body.email
			);

			userDAO.createUser(newUser, function(err, createdUser) {
				if (err) {
					console.error('error: ['+err.message+'] in passport/passport-strategies.js#signup');
					return done(err);
				}
				console.log('successful signup user with username = ['+createdUser.username+'] in passport/signup.js#signup');
				return done(null, createdUser);
			});
		});
	}

	this.login = function(req, username, password, done) {
		req.body.username.should.be.ok;
		req.body.password.should.be.ok;
		done.should.be.a.function;
		userDAO.readUsers.should.be.a.function;

		process.nextTick(function() {
			console.log('check login credentials in passport/passport-strategies.js#login');
			userDAO.readUsers({username: req.body.username}, function(err, foundUsers) {
				if(err) {
					console.error('error: ['+err.message+'] in passport/passport-strategies.js#login');
					return done(err);
				} 
				if(foundUsers === false) {
					var err = new Error('no user found with username = ['+req.body.username+'] in passport/passport-strategies.js#login');
					return done(err);
				} else {
					for (var i = 0; i < foundUsers.length; i++) {
						if(isValidPassword(foundUsers[i].password, req.body.password)) {
							console.log('successful login user with username = ['+foundUsers[i].username+'] in passport/signup.js#login');
							return done(null, foundUsers[i]);
						} else {
							var err = new Error('password of user with username = ['+foundUsers[i].username+'] is not valid in passport/signup.js#login');
							return done(err);
						}
					}
				}
			});
		});
	}
}

function createHash(password){
	console.log('create Hash for User Password in passport/passport-strategies.js#createHash');
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
}

function isValidPassword(storedPassword, password){
	console.log('compare Password in passport/passport-strategies.js#isValidPassword');
	return bCrypt.compareSync(password, storedPassword);
}