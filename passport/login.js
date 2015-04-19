var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){
	console.log('create login strategy in passport/login.js');
	passport.use('login', new LocalStrategy({passReqToCallback : true}, function(req, username, password, done) {
		/*console.log('Check Login credentials in passport/login.js');
		// check in mongo if a user with username exists or not
		db.users.find({ 'username' : username }, function(err, user) {
			// In case of any error, return using the done method

			if (err) return done(err);
			// Username does not exist, log the error and redirect back
			if (user.length == 0){
				console.log('User Not Found with username '+username+' in passport/login.js');
				return done(null, false);
			}
			// User exists but wrong password, log the error
			if (!isValidPassword(user[0].password, password)){
				console.log('Invalid Password in passport/login.js');
				return done(null, false); // redirect back to login page
			}
			// User and password both match, return user from done method
			// which will be treated like success
			return done(null, user[0]);
		});
		db.users.loadDatabase();*/
	}));

	var isValidPassword = function(storedPassword, password){
		console.log('compare Password in passport/login.js#isValidPassword');
		console.log('storedPassword='+storedPassword);
		return bCrypt.compareSync(password, storedPassword);
	}
}