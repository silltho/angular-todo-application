var Datastore = require('nedb');

module.exports = function UserDAO(db_env) {
	var db;

	if(db_env == "test") {
		db = new Datastore({ autoload: true });
	} else {
		db = new Datastore({ filename: 'db/db.db', autoload: true });
	}

	this.getDB = function() {
		return db;
	}

	this.createUser = function(user, done){
		db.find(user, function(err, users) {
			if (err) {
				console.log('error in finding user: ' + err + ' in db/userDAO.js');
				return done(err);
			}
			if (users.length != 0) {
				console.log('user: ' + user + ' already exists in db/userDAO.js');
				return done(null, null);
			} else {
				db.insert(user, function(err, newUser) {
					if (err){
						console.log('error in saving user: ' + err + ' in db/userDAO.js'); 
						return done(err); 
					}
					console.log('create user: ' + newUser.username + ' succesful in db/userDAO.js');  
					return done(null, newUser);
				});
			}
		});
	}

	this.readUsers = function(searchParams, done) {
		db.find(searchParams, function(err, users) {
			if (err) {
				return done(err);
			}
			if (users.length == 0) {
				console.log('no user found with: ' + JSON.stringify(searchParams, null, 4) + ' in db/userDAO.js');
				return done(null, false);
			}
			console.log(users.length + ' users found in db/userDAO.js');
			return done(null, users);
		});
	}

	this.updateUser = function(user, done) {
		db.update({ _id:user._id }, user, function (err, numReplaced) {
			if (err) {
				return done(err);
			}
			console.log('updated user with id = ' + user._id + ' in db/userDAO.js');
			return done(null, numReplaced);
		});
	}

	this.deleteUser = function(user, done) {
		db.remove({ _id:user._id }, {}, function(err) {
			if (err) {
				return done(err);
			}
			console.log('successfull delete user in db/userDAO.js');
			done(null);
		});
	}
};