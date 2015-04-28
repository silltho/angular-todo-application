var should = require('should');

module.exports = function UserDAO(db) {
	db.should.be.ok;
	var db = db;

	this.createUser = function(user, done){
		user.username.should.be.ok;
		user.password.should.be.ok;
		db.find({username: user.username}, function(err, users) {
			if (err) {
				return done(err);
			}
			if (users.length != 0) {
				return done(new Error('user with username = ['+user.username+'] already exists in db/userDAO.js'));
			} else {
				db.insert(user, function(err, createdUser) {
					if (err){
						return done(err); 
					}
					console.log('create user: ['+createdUser.username+'] succesful in db/userDAO.js');  
					return done(null, createdUser);
				});
			}
		});
	}

	this.readUsers = function(searchParams, done) {
		searchParams.should.be.ok;
		db.find(searchParams, function(err, users) {
			if (err) {
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
		user.should.be.ok;
		user._id.should.be.ok;
		db.update({ _id:user._id }, user, function (err, numReplaced) {
			if (err) {
				return done(err);
			}
			console.log('updated user with id = ['+user._id+'] in db/userDAO.js');
			return done(null, numReplaced);
		});
	}

	this.deleteUser = function(user, done) {
		user.should.be.ok;
		user._id.should.be.ok;
		db.remove({ _id:user._id }, {}, function(err) {
			if (err) {
				return done(err);
			}
			console.log('successfull delete user in db/userDAO.js');
			done(null);
		});
	}
};