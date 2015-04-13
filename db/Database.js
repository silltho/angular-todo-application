var Datastore = require('nedb');

module.exports = function Database(db_env) {
	
	this.db_env = db_env;

	this.userdb = new Datastore({ filename: this.db_env+'/users.db', autoload: true });
};