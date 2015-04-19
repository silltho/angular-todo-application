var express = require('express');

var router = require('./routes/routes');
var app = express();

app.use(router);

module.exports = app;