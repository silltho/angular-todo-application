var bCrypt = require('bcrypt-nodejs');
var User = require('../model/user.js');

module.exports = function PassportStrategies(userDAO) {
	var userDAO = userDAO;

	this.signup = function(req, username, password, done) {
		process.nextTick(function() {
			console.log('check signup credentials in passport/passport-strategies.js');
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
				return done(createdUser);
			});
		});
	}

	this.login = function(req, username, password, done) {
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