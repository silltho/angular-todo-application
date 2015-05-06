var express = require('express');
var passport = require('passport');
var expressBunyanLogger = require('express-bunyan-logger');
var should = require('should');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');

var UserService = require('./service/user-service');
var PassportStrategies = require('./passport/passport-strategies');
var UserDAO = require('./dao/user-dao');
var Router = require('./routes/routes');
var initPassport = require('./passport/passport-init');

module.exports = function App(db, log) {
	should.exist(db);
	should.exist(log);

	this.app = express();
	this.db = db;
	this.log = log;
	this.userDAO = new UserDAO(this.db, this.log.child({
		destination: './dao/user-dao.js'
	}));
	this.passportStrategies = new PassportStrategies(this.userDAO, this.log.child({
		destination: './passport/passport-strategies.js'
	}));
	this.passport = initPassport(passport, this.passportStrategies);
	this.userService = new UserService(this.userDAO, passport, this.log.child({
		destination: './service/user-service.js'
	}));
	this.router = new Router(this.app, passport, this.userService, this.log.child({
		destination: './routes/routes.js'
	}));

	this.app.use(this.router.router);

	this.app.use(bodyParser.json());
	this.app.use(bodyParser.urlencoded({extended: true}));

	this.app.use(expressSession({secret: 'mySecretKey'}));
	this.app.use(cookieParser());

	this.app.use(passport.initialize());
	this.app.use(passport.session());

	this.app.use(expressBunyanLogger());

	this.app.use(express.static(path.join(__dirname, 'public')));

	this.app.set('views', path.join(__dirname, 'views'));
	this.app.set('view engine', 'ejs');
};