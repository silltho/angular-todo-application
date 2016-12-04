var should = require('should');
var bCrypt = require('bcrypt-nodejs');

module.exports = function UserDAO(db, log) {
	should.exist(db);
	should.exist(log);

	this.createUser = function (user, done) {
		should.exist(user);
		should.exist(done);
		done.should.be.type('function');

		user.password = createHash(user.password);

		db.find({username: user.username}, function (err, users) {
			if (err) {
				return done(err);
			}
			if (users.length !== 0) {
				var err = new Error('user with username = [' + user.username + '] already exists');
				err.errorType = 'signupError';
				return done(err);
			} else {
				db.insert(user, function (err, createdUser) {
					if (err) {
						return done(err);
					}
					log.info({'function': 'createUser'}, 'successful create user: [%s]', createdUser.username);
					return done(null, createdUser);
				});
			}
		});
	};

	this.readUsers = function (searchParams, done) //noinspection BadExpressionStatementJS
	{
		should.exist(searchParams);
		should.exist(done);
		done.should.be.type('function');

		db.find(searchParams, function (err, users) {
			if (err) {
				return done(err);
			}
			if (users.length === 0) {
				log.info({'function': 'readUsers', 'searchParams': searchParams}, 'no users found');
				//console.log('no user found with: '+JSON.stringify(searchParams, null, 4)+' in db/userDAO.js');
				return done(null, false);
			}
			log.info({'function': 'readUsers', 'searchParams': searchParams}, '%s users found', users.length);
			//console.log(users.length + ' users found in db/userDAO.js');
			return done(null, users);
		});
	};

	this.updateUser = function (user, done) //noinspection BadExpressionStatementJS
	{
		should.exist(user);
		should.exist(done);
		done.should.be.type('function');

		db.update({_id: user._id}, user, function (err, numReplaced) {
			if (err) {
				return done(err);
			}
			log.info({'function': 'updateUser'}, 'updated user with id = [%s]', user._id);
			//console.log('updated user with id = ['+user._id+'] in db/userDAO.js');
			return done(null, numReplaced);
		});
	};

	this.deleteUser = function (user, done) //noinspection BadExpressionStatementJS
	{
		should.exist(user);
		should.exist(done);
		done.should.be.type('function');

		db.remove({_id: user._id}, {}, function (err) {
			if (err) {
				return done(err);
			}
			log.info({'function': 'updateUser'}, 'successfull delete user');
			//console.log('successfull delete user in db/userDAO.js');
			done(null);
		});
	};

	function createHash(password) {
		//log.info({'function': 'createHash'}, 'create hash for user password');
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
	}
};