var express = require('express');

var router = require('./routes/routes');
var app = express();

db = new Datastore({ filename: '../db/db.db', autoload: true });

app.use(router);

module.exports = app;