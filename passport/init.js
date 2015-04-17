var login = require('./login');
var signup = require('./signup');

module.exports = function initPassport(passport) {

	console.log("Initialize Passport in passport/init.js");

	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(user, done) {
	  done(null, user);
	});

	login(passport);
	signup(passport);
}