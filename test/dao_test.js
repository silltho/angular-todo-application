var should = require('should');

var Test = require('./test');
var test = {};

describe('DAO Tests', function() {
	beforeEach(function() {
		test = new Test();
	});

	it('should create new user', function(done) {
		var testUser = test.createTestUser();

		test.userDAO.createUser(testUser, function() {
			done();
		});
	});

	it('should find user', function(done){
		var testUser = test.createTestUser();

		test.userDAO.createUser(testUser, function(){
			test.userDAO.readUsers({ _id: testUser._id }, function(err, foundUsers) {
				foundUsers.should.not.be.false;
				foundUsers.should.have.lengthOf(1);
				foundUsers[0].should.eql(testUser);
				done(err);
			});
		});
	});

	it('should update user', function(done){
		var testUser = test.createTestUser();

		test.userDAO.createUser(testUser, function() {
			test.userDAO.readUsers({ _id: testUser._id }, function(err, foundUsers) {
				testUser = foundUsers[0];
				testUser.description = 'TestUser-updated';
				test.userDAO.updateUser(testUser, function(err, numReplaced) {
					test.userDAO.readUsers({ _id: testUser._id },function(err, updatedUsers) {
						updatedUsers.should.not.be.false;
						updatedUsers.should.have.lengthOf(1);
						updatedUsers[0].should.eql(testUser);
						done();
					});
				});	
			});
		});	
	});

	it('should delete user', function(done){
		var testUser = test.createTestUser();

		test.userDAO.createUser(testUser, function() {
			test.userDAO.readUsers({ _id: testUser._id }, function(err, foundUsers) {
				testUser = foundUsers[0];
				testUser.description = 'TestUser-updated';
				test.userDAO.updateUser(testUser, function(err, numReplaced) {
					test.userDAO.readUsers({ _id: testUser._id },function(err, updatedUsers) {
						updatedUsers.should.not.be.false;
						updatedUsers.should.have.lengthOf(1);
						updatedUsers[0].should.eql(testUser);
						done();
					});
				});	
			});
		});	
	});
});