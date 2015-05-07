var Datastore = require('nedb');
var PrettyStream = require('bunyan-prettystream');
var prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

var log = require('bunyan').createLogger({
	name: 'todo-applikation-api',
	streams: [{
		type: 'raw',
		stream: prettyStdOut
	}]
});
var TodoApplication = require('../app.js');
var db = new Datastore({
	filename: 'db/db.db',
	autoload: true
});
var todoapplication = new TodoApplication(db, log);

var port = 3000;

var server = todoapplication.app.listen(port, function () {
	console.log('Server listening at port' + port);
});