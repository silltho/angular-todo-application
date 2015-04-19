var should = require('should');
var sinon = require('sinon');
var passport = require('passport');
var initPassport = require('../passport/passport-init');
var express = require('express');
var expressSession = require('express-session');
var app = express();

before(function() {
	app.use(expressSession({secret: 'mySecretKey'}));
	app.use(passport.initialize());
	app.use(passport.session());
	initPassport(passport);
});

describe('Authentication Tests', function() {
	it('should signup user', function(done) {
		debugger;
		passport.authenticate('signup');
		done();
	})
});