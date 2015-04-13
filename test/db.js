var should = require('should');
var Database = require('../db/Database');

describe('Database Tests', function() {
	it('should open db connection', function(done) {
		var testDatabase = new Database("test");

		testDatabase.should.not.be.null;
		done();
	});

	it('should create new user', function(done) {
		var testDatabase = new Database("test");

		testDatabase.userDAO.createUser('TestUser', null);

		testDatabase.userDAO.getDB().count({}, function(err, count) {
			count.should.eql(1);
		});
		done();
	});

});