var Datastore = require('nedb');

module.exports = function UserDAO(db_env){

	this.userdb = new Datastore({ filename: './db/'+db_env+'/users.db', autoload: true });

	this.createUser = function(username, done){
		this.userdb.find({ 'username' : username }, function(err, user) {
			if (err) {
				console.log('error in finding user: ' + err + ' in db/userDAO.js');
				return done(err);
			}
			if (user.length != 0) {
				console.log('user with username = ' + username + ' already exists in db/userDAO.js');
				return done(null, null);
			} else {
				var newUser = {username:username};
				userdb.insert(newUser, function(err, newUser) {
					if (err){
						console.log('error in saving user: ' + err + ' in db/userDAO.js'); 
						throw err; 
					}
					console.log('create user with username = ' + username + ' succesful in db/userDAO.js');  
					return done(null, newUser);
				});
			}
		});
	}
};