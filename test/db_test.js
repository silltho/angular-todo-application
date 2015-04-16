var should = require('should');
var Database = require('../db/Database');
var User = require('../model/user');

describe('DAO Tests', function() {

	it('should create new user', function(done) {
		var testUserDAO = createTestUserDAO();
		var testUser = createTestUser();
		testUserDAO.createUser(testUser, function() {
			testUserDAO.getDB().count({}, function(err, count) {
				count.should.eql(1);
				done();
			});
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

	/*it('should create new todo', function(done) {
		var testTodoDAO = createTestTodoDAO();
		var testTodo = createTestTodo();

		testTodoDAO.createTodo(testTodo, function() {
			testTodoDAO.getDB().count({}, function(err, count) {
				count.should.eql(1);
				done();
			});
		});
	});

	it('should find todos', function(done){
		var testTodoDAO = createTestTodoDAO();
		var testTodo = createTestTodo();

		testTodoDAO.createTodo(testTodo, function() {
			testTodoDAO.readTodos(testTodo, function(err, foundTodos) {
				foundTodos.should.not.be.false;
				foundTodos.should.have.lengthOf(1);
				foundTodos[0].should.eql(testTodo);
				done();
			});	
		});	
	});

	it('should update todo', function(done){
		var testTodoDAO = createTestTodoDAO();
		var testTodo = createTestTodo();

		testTodoDAO.createTodo(testTodo, function() {
			testTodoDAO.readTodos(testTodo, function(err, foundTodos) {
				testTodo = foundTodos[0];
				testTodo.description = 'TestTodo-updated';
				console.log(testTodo);
				testTodoDAO.updateTodo(testTodo, function(err, numReplaced) {
					testTodoDAO.readTodos(testTodo,function(err, updatedTodos) {
						updatedTodos.should.not.be.false;
						updatedTodos.should.have.lengthOf(1);
						updatedTodos[0].should.eql(testTodo);
						done();
					});
				});	
			});
		});	
	});

	it('should delete todos', function(done){
		var testTodoDAO = createTestTodoDAO();
		var testTodo = createTestTodo();

		testTodoDAO.createTodo(testTodo, function(err, createdTodo) {
			testTodo = createdTodo;
			testTodoDAO.deleteTodo(testTodo, function(err) {
				should.not.exist(err);
				testTodoDAO.readTodos(testTodo, function(err, foundTodos) {
					foundTodos.should.be.false;
					done();
				});
			});	
		});	
	});*/

});

function createTestDatabase() {
	return new Database("test");
}

function createTestUserDAO() {
	return createTestDatabase().getUserDAO();
}

function createTestTodoDAO() {
	return createTestDatabase().getTodoDAO();
}

function createTestUser(){
	var testUser = new User('username', 'password', 'firstName', 'lastName', 'email');
	testUser.createTodo('description');
	return testUser;
}

function createTestTodo() {
	return {description: 'TestTodo'};
}