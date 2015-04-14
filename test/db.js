var should = require('should');
var Database = require('../db/Database');

describe('DAO Tests', function() {

	it('should create new user', function(done) {
		var testUserDAO = createTestUserDAO();

		testUserDAO.createUser('TestUser', null);

		testUserDAO.getDB().count({}, function(err, count) {
			count.should.eql(1);
		});
		done();
	});

	it('should find user', function(done){
		var testUserDAO = createTestUserDAO();
		var testUser = 'TestUser';
		testUserDAO.createUser(testUser, null);

		testUserDAO.findUsers(testUser, function(err, foundUsers){
			foundUsers.should.have.lengthOf(1);
			foundUsers[0].username.should.be.testUser
		});
		done();
	});

	it('should create new todo', function(done) {
		var testTodoDAO = createTestTodoDAO();

		testTodoDAO.createTodo('Test-Todo', null);

		testTodoDAO.getDB().count({}, function(err, count) {
			count.should.eql(1);
		});
		done();
	});

	it('should find todos', function(done){
		var testTodoDAO = createTestTodoDAO();
		var testTodo = 'Test-Todo';
		testTodoDAO.createTodo(testTodo, null);

		testTodoDAO.findTodos(testTodo, function(err, foundTodos){
			foundTodos.should.have.lengthOf(1);
			foundTodos[0].should.be.testTodo
		});
		done();
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