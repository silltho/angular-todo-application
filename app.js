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
var userDAO = new UserDAO(db);
var userService = new UserService(userDAO);
var passportStrategies = new PassportStrategies(userDAO);
var router = new Router(app, passport, userService);

initPassport(passport, passportStrategies);

module.exports = app;