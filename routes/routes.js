var express = require('express');

module.exports = (function() {

	var router = express.Router();

	router.get('/', function(req, res, next) {
		console.log('render index.ejs');
		res.sendStatus(200);
	});

});