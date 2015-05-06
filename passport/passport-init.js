var LocalStrategy = require('passport-local').Strategy;
var should = require('should');

module.exports = function initPassport(passport, passportStrategies) {
	should.exist(passport);
	should.exist(passportStrategies);

	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (user, done) {
		done(null, user);
	});

	passport.use('signup', new LocalStrategy({passReqToCallback: true}, passportStrategies.signup));
	passport.use('login', new LocalStrategy({passReqToCallback: true}, passportStrategies.login));

	return passport;
};