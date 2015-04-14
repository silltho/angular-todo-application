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
	};

	this.createTodo = function(todo, done){
		db.insert(todo, function(err, newTodo) {
			if (err){
				console.log('error in saving todo: ' + err + ' in db/todoDAO.js'); 
				throw err; 
			}
			console.log('create todo with description = ' + description + ' succesful in db/todoDAO.js');  
			return done(null, newTodo);
		});
	};


	this.findTodos = function(searchParams, done) {
		db.find(searchParams, function(err, todos) {
			if (err) {
				return done(err);
			}
			if (todos.length == 0) {
				console.log('no todo found with: ' + searchParams + ' in db/userDAO.js');
				return done(null, false);
			}
			console.log(todos.length + ' todos found with: ' + searchParams + ' in db/userDAO.js');
			return done(null, users);
		});
	}
};