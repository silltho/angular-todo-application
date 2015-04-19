var LocalStrategy = require('passport-local').Strategy;
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

	passport.use('signup', new LocalStrategy({passReqToCallback : true}, signup);
	passport.use('login', new LocalStrategy({passReqToCallback : true}, login);
}