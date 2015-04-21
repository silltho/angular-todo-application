module.exports = function UserDAO(db) {
	var db = db;

	this.createUser = function(user, done){
		db.find(user, function(err, users) {
			if (err) {
				console.error('error in finding user: ['+err.message+'] in db/userDAO.js');
				return done(err);
			}
			if (users.length != 0) {
				var err = new Error('user with username = ['+user.username+'] already exists in db/userDAO.js');
				return done(err);
			} else {
				db.insert(user, function(err, createdUser) {
					if (err){
						console.error('error in createUser: ['+err.message+'] in db/userDAO.js'); 
						return done(err); 
					}
					console.log('create user: ['+createdUser.username+'] succesful in db/userDAO.js');  
					return done(null, createdUser);
				});
			}
		});
	}

	this.readUsers = function(searchParams, done) {
		db.find(searchParams, function(err, users) {
			if (err) {
				console.error('error in readUsers: ['+err.message+'] in db/userDAO.js'); 
				return done(err);
			}
			if (users.length == 0) {
				console.log('no user found with: '+JSON.stringify(searchParams, null, 4)+' in db/userDAO.js');
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
			console.log('updated user with id = ['+user._id+'] in db/userDAO.js');
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