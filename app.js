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

function App() {
    this.app = express();
    this.passport = passport;
    this.db = new Datastore({
        autoload: true
    });
    this.userDAO = new UserDAO(this.db, log.child({
        destination: './dao/user-dao.js'
    }));
    this.passportStrategies = new PassportStrategies(this.userDAO, log.child({
        destination: './passport/passport-strategies.js'
    }));
    this.passport = initPassport(this.passport, this.passportStrategies);
    this.userService = new UserService(this.userDAO, this.passport, log.child({
        destination: './service/user-service.js'
    }));
    this.router = new Router(this.app, this.passport, this.userService, log.child({
        destination: './routes/routes.js'
    }));

    this.app.use(logger('dev'));
}

module.exports = new App();