var Datastore = require('nedb');

module.exports = function UserDAO(db_env) {
	var db;

	if(db_env == "test") {
		db = new Datastore({ autoload: true });
	} else {
		db = new Datastore({ filename: 'db/users.db', autoload: true });
	}

	this.getDB = function() {
		return db;
	};

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
						debugger;
						console.log('error in saving user: ' + err + ' in db/userDAO.js'); 
						throw err; 
					}
					console.log('create user: ' + newUser + ' succesful in db/userDAO.js');  
					return done(null, newUser);
				});
			}
		});
	};


	this.findUsers = function(searchParams, done) {
		db.find(searchParams, function(err, users) {
			if (err) {
				return done(err);
			}
			if (users.length == 0) {
				console.log('no user found with: ' + searchParams + ' in db/userDAO.js');
				return done(null, false);
			}
			console.log(users.length + ' users found with: ' + searchParams + ' in db/userDAO.js');
			return done(null, users);
		});
	}
};