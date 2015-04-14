var Datastore = require('nedb');

module.exports = function TodoDAO(db_env) {
	var db;

	if(db_env == "test") {
		db = new Datastore({ autoload: true });
	} else {
		db = new Datastore({ filename: 'db/todos.db', autoload: true });
	}

	this.getDB = function() {
		return db;
	}

	this.createTodo = function(todo, done){
		db.insert(todo, function(err, newTodo) {
			if (err){
				console.log('error in saving todo: ' + err + ' in db/todoDAO.js'); 
				return done(err); 
			}
			console.log('succesful create new todo with id = ' + newTodo._id + ' in db/todoDAO.js');  
			return done(null, newTodo);
		});
	}

	this.readTodos = function(searchParams, done) {
		db.find(searchParams, function(err, todos) {
			if (err) {
				return done(err);
			}
			if (todos.length == 0) {
				console.log('no todo found with: ' + JSON.stringify(searchParams, null, 4) + ' in db/todoDAO.js');
				return done(null, false);
			}
			console.log(todos.length + ' todos found in db/todoDAO.js');
			return done(null, todos);
		});
	}

	this.updateTodo = function(todo, done) {
		db.update({ _id:todo._id }, todo, function (err, numReplaced) {
			if (err) {
				return done(err);
			}
			console.log('updated todo with id = ' + todo._id + ' in db/todoDAO.js');
			return done(null, numReplaced);
		});
	}

	this.deleteTodo = function(todo, done) {
		db.remove({ _id:todo._id }, {}, function(err) {
			if (err) {
				return done(err);
			}
			console.log('successfull delete todo in db/todoDAO.js');
			done(null);
		});
	}
};