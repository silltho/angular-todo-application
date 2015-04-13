var UserDAO = require('./userDAO');

module.exports = function Database(db_env) {
	
	this.db_env = db_env;
	this.userDAO = new UserDAO(this.db_env);

};