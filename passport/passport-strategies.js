var bCrypt = require('bcrypt-nodejs');
var should = require('should');
var User = require('../model/user.js');

module.exports = function PassportStrategies(userDAO, log) {
	should.exist(userDAO);
	should.exist(log);

	this.signup = function (req, username, password, next) {
		should.exist(req.body.username);
		should.exist(req.body.password);
		should.exist(req.body.firstName);
		should.exist(req.body.lastName);
		should.exist(req.body.email);
		should.exist(next);
		next.should.be.type('function');

		process.nextTick(function () {
			log.info({'function': 'signup'}, 'check signup credentials of user with username = [%s]', req.body.username);
			var newUser = new User(
				req.body.username,
				req.body.password,
				req.body.firstName,
				req.body.lastName,
				req.body.email
			);

			userDAO.createUser(newUser, function (err, createdUser) {
				if (err) {
					return next(err);
				}
				log.info({'function': 'signup'}, 'successful signup user with username = [%s]', createdUser.username);
				return next(null, createdUser);
			});
		});
	};

	this.login = function (req, username, password, next) {
		should.exist(req.body.username);
		should.exist(req.body.password);
		should.exist(next);
		next.should.be.type('function');

		process.nextTick(function () {
			log.info({'function': 'login'}, 'check login credentials of user with username = [%s]', req.body.username);
			userDAO.readUsers({username: req.body.username}, function (err, foundUsers) {
				if (err) {
					return next(err);
				}
				if (foundUsers === false) {
					var err = new Error('no user found with username = [' + req.body.username + ']');
					err.errorType = 'loginError';
					return next(err);
				} else {
					foundUsers.forEach(function (user) {
						if (isValidPassword(user.password, req.body.password)) {
							log.info({'function': 'login'}, 'successful login user with username = [%s]', user.username);
							return next(null, user);
						} else {
							var err = new Error('password of user with username = [' + user.username + '] is not valid');
							err.errorType = 'loginError';
							return next(err);
						}
					});
				}
			});
		});
	};

	function isValidPassword(storedPassword, password) {
		log.info({'function': 'createHash'}, 'compare stored-password with db-hash');
		return bCrypt.compareSync(password, storedPassword);
	}
};