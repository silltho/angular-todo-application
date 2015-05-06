var Datastore = require('nedb');

var log = require('bunyan').createLogger({
	name: 'todo-applikation-api'
});
var TodoApplication = require('../app.js');
var db = new Datastore({
	autoload: true
});
var todoapplication = new TodoApplication(db, log);

var port = 3000;

var server = todoapplication.app.listen(port, function () {
	console.log('Server listening at port' + port);
});