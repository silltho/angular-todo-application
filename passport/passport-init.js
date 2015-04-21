var LocalStrategy = require('passport-local').Strategy;

module.exports = function initPassport(passport, passportStrategies) {

	console.log("Initialize Passport in passport/init.js");

	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(user, done) {
	  done(null, user);
	});

	passport.use('signup', new LocalStrategy({passReqToCallback : true}, passportStrategies.signup));
	passport.use('login', new LocalStrategy({passReqToCallback : true}, passportStrategies.login));
}