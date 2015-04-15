var UserDAO = require('./userDAO');
var TodoDAO = require('./todoDAO');

module.exports = function Database(db_env) {
	
	var db_env = db_env;
	var userDAO = new UserDAO(db_env);
	//var todoDAO = new TodoDAO(db_env);

	this.getUserDAO = function() {
		return userDAO;
	}

	/*this.getTodoDAO = function() {
		return todoDAO;
	}*/
};