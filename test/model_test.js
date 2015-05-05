var should = require('should');

var Test = require('./test');
var test = new Test();

describe('Model Tests', function() {

	it('should create User', function (done) {
		var testUser = test.createTestUser();

		testUser.username.should.exist;
		testUser.password.should.exist;
		testUser.email.should.exist;
		testUser.firstName.should.exist;
		testUser.lastName.should.exist;
		done();
	});

	it('should create todo in user', function(done) {
		var testUser = test.createTestUser();
		var description = 'testDescriptionCreate';

		testUser.createTodo(description);
		testUser.todos.should.have.lengthOf(2);
		testUser.todos[1].description.should.eql(description);
		done();
	});

	it('should get todo by id in user', function(done) {
		var testUser = test.createTestUser();
		var foundTodo = testUser.getTodoById(testUser.todos[0]._id);

		foundTodo.should.not.be.null;
		foundTodo.should.eql(testUser.todos[0]);
		done();
	});

	it('should update todo in user', function(done) {
		var testUser = test.createTestUser();
		var updatedTodo = testUser.todos[0];

		updatedTodo.description = 'testDescriptionUpdate';
		updatedTodo.done = true;
		testUser.updateTodo(updatedTodo);
		testUser.todos.should.have.lengthOf(1);
		testUser.todos[0].should.eql(updatedTodo);
		done();
	});

	it('should delete todo in user', function(done) {
		var testUser = test.createTestUser();

		testUser.deleteTodo(testUser.todos[0]._id);
		testUser.todos.should.have.lengthOf(0);
		done();
	});
});
