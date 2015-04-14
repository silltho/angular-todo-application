var express = require('express');

var app = express();
var router = express.Router();

router.get('/', function(req, res, next) {
	console.log('render index.ejs');
	res.sendStatus(200);
});

app.use(router);

module.exports = app;