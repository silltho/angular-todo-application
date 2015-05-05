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
var db = new Datastore({filename: './db/db.db', autoload: true});
var userDAO = new UserDAO(db, log.child({
	destination: './dao/user-dao.js'
}));
var userService = new UserService(userDAO, passport, log.child({
	destination: './service/user-service.js'
}));
var passportStrategies = new PassportStrategies(userDAO, log.child({
	destination: './passport/passport-strategies.js'
}));
var router = new Router(app, passport, userService, log.child({
	destination: './routes/routes.js'
}));

initPassport(passport, passportStrategies);

app.use(logger('dev'));

module.exports = app;