var should = require('should');
var Database = require('../db/Database');

describe('Database Tests', function() {
	it('should open db connection', function(done) {
		var testDatabase = new Database("test");

		testDatabase.should.not.be.null;
		done();
	});

});