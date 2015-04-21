var bCrypt = require('bcrypt-nodejs');
var User = require('../model/user.js');

module.exports = function PassportStrategies(userDAO) {
	var userDAO = userDAO;
	
	this.signup = function(req, done) {
		console.log('check signup credentials in passport/passport-strategies.js');
		var newUser = new User(
			req.username, 
			createHash(req.password), 
			req.firstname, req.lastname, 
			req.email
		);

		userDAO.createUser(newUser, function(err, createdUser) {
			if (err) {
				console.error('error: ['+err.message+'] in passport/passport-strategies.js#signup');
				done(err);
			}
			console.log('successful signup user with username = ['+createdUser.username+'] in passport/signup.js#signup');
			done(null, createdUser);
		});
	}

	this.login = function(req, done) {
		console.log('check login credentials in passport/passport-strategies.js#login');
		debugger;
		userDAO.readUsers({username: req.username}, function(err, foundUsers) {
			if(err) {
				console.error('error: ['+err.message+'] in passport/passport-strategies.js#login');
				done(err);
			} 
			if(foundUsers === false) {
				var err = new Error('no user found with username = ['+req.username+'] in passport/passport-strategies.js#login');
				done(err);
			} else {
				for (var i = 0; i < foundUsers.length; i++) {
					if(isValidPassword(foundUsers[i].password, req.password)) {
						console.log('successful login user with username = ['+foundUsers[i].username+'] in passport/signup.js#login');
						return done(null, foundUsers[i]);
					}
				}
			}
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