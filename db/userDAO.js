var Datastore = require('nedb');

module.exports = function UserDAO(db_env) {
	var db;

	if(db_env == "test") {
		db = new Datastore({ autoload: true });
	} else {
		db = new Datastore({ filename: 'users.db', autoload: true });
	}

	this.getDB = function() {
		return db;
	};

	this.createUser = function(username, done){
		db.find({ 'username' : username }, function(err, user) {
			if (err) {
				console.log('error in finding user: ' + err + ' in db/userDAO.js');
				return done(err);
			}
			if (user.length != 0) {
				console.log('user with username = ' + username + ' already exists in db/userDAO.js');
				return done(null, null);
			} else {
				var user = {username:username};
				db.insert(user, function(err, newUser) {
					if (err){
						console.log('error in saving user: ' + err + ' in db/userDAO.js'); 
						throw err; 
					}
					console.log('create user with username = ' + username + ' succesful in db/userDAO.js');  
					return done(null, newUser);
				});
			}
		});
	};
};