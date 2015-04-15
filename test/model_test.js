var should = require('should');
var User = require('../model/user');

describe('Model Tests', function() {

	it('should create User', function(done) {
		var testUser = createTestUser();
		testUser.username.should.exist;
		done();
	});

	it('should create todo in user', function(done) {
		var testUser = createTestUser();
		var description = 'testDescriptionCreate';
		testUser.createTodo(description);
		testUser.todos.should.have.lengthOf(2);
		testUser.todos[1].description.should.eql(description);
		done();
	});

	it('should get todo by id in user', function(done) {
		var testUser = createTestUser();
		var foundTodo = testUser.getTodoById(testUser.todos[0]._id);
		foundTodo.should.not.be.null;
		foundTodo.should.eql(testUser.todos[0]);
		done();
	});

	it('should update todo in user', function(done) {
		var testUser = createTestUser();
		var updatedTodo = testUser.todos[0];
		updatedTodo.description = 'testDescriptionUpdate';
		updatedTodo.done = true;
		testUser.updateTodo(updatedTodo);
		testUser.todos.should.have.lengthOf(1);
		testUser.todos[0].should.eql(updatedTodo);
		done();
	});

	it('should delete todo in user', function(done) {
		var testUser = createTestUser();
		testUser.deleteTodo(testUser.todos[0]._id);
		testUser.todos.should.have.lengthOf(0);
		done();
	});
});

function createTestUser(){
	var testUser = new User('username', 'password', 'firstName', 'lastName', 'email');
	testUser.createTodo('description');
	return testUser;
}