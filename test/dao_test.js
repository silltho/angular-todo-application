var should = require('should');
var UserDAO = require('../dao/user-dao');
var User = require('../model/user');

describe('DAO Tests', function() {

	it('should create new user', function(done) {
		var testUserDAO = createTestUserDAO();
		var testUser = createTestUser();
		testUserDAO.createUser(testUser, function() {
			done();
		});
	});

	it('should find user', function(done){
		var testUserDAO = createTestUserDAO();
		var testUser = createTestUser();

		testUserDAO.createUser(testUser, function(){
			testUserDAO.readUsers({ _id: testUser._id }, function(err, foundUsers) {
				foundUsers.should.not.be.false;
				foundUsers.should.have.lengthOf(1);
				foundUsers[0].should.eql(testUser);
				done(err);
			});
		});
	});

	it('should update user', function(done){
		var testUserDAO = createTestUserDAO();
		var testUser = createTestUser();

		testUserDAO.createUser(testUser, function() {
			testUserDAO.readUsers({ _id: testUser._id }, function(err, foundUsers) {
				testUser = foundUsers[0];
				testUser.description = 'TestUser-updated';
				testUserDAO.updateUser(testUser, function(err, numReplaced) {
					testUserDAO.readUsers({ _id: testUser._id },function(err, updatedUsers) {
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
		var testUserDAO = createTestUserDAO();
		var testUser = createTestUser();

		testUserDAO.createUser(testUser, function() {
			testUserDAO.readUsers({ _id: testUser._id }, function(err, foundUsers) {
				testUser = foundUsers[0];
				testUser.description = 'TestUser-updated';
				testUserDAO.updateUser(testUser, function(err, numReplaced) {
					testUserDAO.readUsers({ _id: testUser._id },function(err, updatedUsers) {
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

function createTestUserDAO() {
	return new UserDAO('test');
}

function createTestUser(){
	var testUser = new User('username', 'password', 'firstName', 'lastName', 'email');
	testUser.createTodo('description');
	return testUser;
}

function createTestTodo() {
	return {description: 'TestTodo'};
}