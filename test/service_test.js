var should = require('should');
var sinon = require('sinon');

var Test = require('./test');
var test = {};

describe('Service Tests', function () {
	beforeEach(function () {
		test = new Test();
	});

	describe('User Tests', function () {
		it("should signup user", function () {
			var req = {};
			var res = {};
			var spy = res.json = sinon.spy();
			req.user = test.createTestUser();

			test.userService.signup(req, res);

			spy.calledOnce.should.be.true;
		});

		it("should login user", function () {
			var req = {};
			var res = {};
			var spy = res.json = sinon.spy();
			req.user = test.createTestUser();

			test.userService.login(req, res);

			spy.calledOnce.should.be.true;
		});

		it("should check login of user", function () {
			var req = {};
			var res = {};
			var spy = res.json = sinon.spy();
			req.user = test.createTestUser();
			req.isAuthenticated = function () {
				return true;
			};

			test.userService.loginCheck(req, res);

			spy.calledOnce.should.be.true;
		});
	});

	describe('Todo Tests', function () {
		it("should get all todos", function () {
			var req = {};
			var res = {};
			var spy = res.json = sinon.spy();
			req.user = test.createTestUser();

			test.userService.getAllTodos(req, res);

			spy.calledOnce.should.be.true;
			spy.calledWith(req.user.todos).should.be.true;
		});

		it("should create todo", function (done) {
			var req = {};
			var res = {};
			var spy = res.json = sinon.spy();
			req.user = test.createTestUser();
			req.body = {description: 'testDescription'};

			test.userService.createTodo(req, res);
			req.user.todos.should.have.lengthOf(2);
			done();
		});

		it("should update todo", function () {
			var req = {};
			var res = {};
			var testUser = test.createTestUser();
			var oldTodo = JSON.parse(JSON.stringify(testUser.todos[0]));
			var newTodo = JSON.parse(JSON.stringify(testUser.todos[0]));
			var spy = res.json = sinon.spy();

			newTodo.done = true;
			req.body = newTodo;
			req.user = testUser;
			req.params = {id: newTodo._id};

			test.userService.updateTodo(req, res);

			req.user.todos[0].should.not.eql(oldTodo);
			req.user.todos[0].should.eql(newTodo);
		});

		it("should delete todo", function () {
			var req = {};
			var res = {};
			var testUser = test.createTestUser();
			var spy = res.sendStatus = sinon.spy();
			req.params = {id: testUser.todos[0]._id};
			req.user = testUser;

			test.userService.deleteTodo(req, res);

			req.user.todos.should.have.lengthOf(0);
		});
	});
});