var should = require('should');
var Database = require('../db/Database');

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
			testUserDAO.findUsers(testUser, function(err, foundUsers) {
				foundUsers.should.not.be.false;
				foundUsers.should.have.lengthOf(1);
				foundUsers[0].should.eql(testUser);
				done(err);
			});

		});
	});

	it('should create new todo', function(done) {
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
			testTodoDAO.findTodos(testTodo, function(err, foundTodos) {
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
			testTodoDAO.findTodos(testTodo, function(err, foundTodos) {
				testTodo = foundTodos[0];
				testTodo.description = 'TestTodo-updated';
				console.log(testTodo);
				testTodoDAO.updateTodo(testTodo, function(err, updatedTodoId) {
					testTodoDAO.findTodos(testTodo,function(err, updatedTodos) {
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

		testTodoDAO.createTodo(testTodo, function() {
			testTodoDAO.deleteTodos(testTodo, function(err, foundTodos) {
				foundTodos.should.not.be.false;
				foundTodos.should.have.lengthOf(0);
				foundTodos[0].should.eql(testTodo);
				done();
			});	
		});	
	});

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

function createTestUser() {
	return {username: 'TestUser'};
}

function createTestTodo() {
	return {description: 'TestTodo'};
}