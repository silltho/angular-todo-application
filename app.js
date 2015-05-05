var log = require('bunyan').createLogger({
	name: 'todo-applikation-tests'
});
var logger = require('morgan');
var Datastore = require('nedb');
var express = require('express');
var passport = require('passport');

var UserService = require('./service/user-service');
var PassportStrategies = require('./passport/passport-strategies');
var UserDAO = require('./dao/user-dao');
var Router = require('./routes/routes');
var initPassport = require('./passport/passport-init');

var app = express();
debugger;
var db = new Datastore({filename: './db/db.db', autoload: true});
var userDAO = new UserDAO(db, log.child({
	destination: './dao/user-dao.js'
}));
var passportStrategies = new PassportStrategies(userDAO, log.child({
	destination: './passport/passport-strategies.js'
}));
passport = initPassport(passportStrategies);
var userService = new UserService(userDAO, passport, log.child({
	destination: './service/user-service.js'
}));
var router = new Router(app, passport, userService, log.child({
	destination: './routes/routes.js'
}));


app.use(logger('dev'));

module.exports = app;