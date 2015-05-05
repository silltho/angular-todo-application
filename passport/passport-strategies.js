var bCrypt = require('bcrypt-nodejs');
var should = require('should');
var User = require('../model/user.js');

module.exports = function PassportStrategies(userDAO, log) {
	should.exist(userDAO);
	should.exist(log);

	this.signup = function (req, username, password, done) {
		should.exist(req.body.username);
		should.exist(req.body.password);
		should.exist(req.body.firstName);
		should.exist(req.body.lastName);
		should.exist(req.body.email);
		should.exist(done);
		done.should.be.a.function;

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
					return done(err);
				}
				log.info({'function': 'signup'}, 'successful signup user with username = [%s]', createdUser.username);
				return done(null, createdUser);
			});
		});
	};

	this.login = function (req, username, password, done) {
		should.exist(req.body.username);
		should.exist(req.body.password);
		should.exist(done);
		done.should.be.a.function;

		process.nextTick(function () {
			log.info({'function': 'login'}, 'check login credentials of user with username = [%s]', req.body.username);
			userDAO.readUsers({username: req.body.username}, function (err, foundUsers) {
				if (err) {
					return done(err);
				}
				if (foundUsers === false) {
					return done(new Error('no user found with username = [' + req.body.username + '] in passport/passport-strategies.js#login'));
				} else {
					foundUsers.forEach(function (user) {
						if (isValidPassword(user.password, req.body.password)) {
							log.info({'function': 'login'}, 'successful login user with username = [%s]', user.username);
							return done(null, user);
						} else {
							return done(new Error('password of user with username = [' + user.username + '] is not valid in passport/signup.js#login'));
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