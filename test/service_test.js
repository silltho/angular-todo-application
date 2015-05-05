var Datastore = require('nedb');
var should = require('should');
var sinon = require('sinon');
var User = require('../model/user');

var Test = require('./test');
var test = {};

describe('Service Tests', function() {
	beforeEach(function() {
		test = new Test();
	});
	
	describe('User Tests', function() {
		it("should signup user", function() {
			var req = {};
			var res = {};
			var spy = res.sendStatus = sinon.spy();
			req.user = test.createTestUser();

			test.userService.signup(req, res);

			spy.calledOnce.should.be.true;
			spy.calledWith(200).should.be.true;
		});

		it("should login user", function() {
			var req = {};
			var res = {};
			var spy = res.sendStatus = sinon.spy();
			req.user = test.createTestUser();

			test.userService.login(req, res);

			spy.calledOnce.should.be.true;
			spy.calledWith(200).should.be.true;
		});

		it("should check login of user", function() {
			var req = {};
			var res = {};
			var spy = res.sendStatus = sinon.spy();
			req.user = test.generatedUser;
			req.isAuthenticated = function() {
				return true;
			};

			test.userService.loginCheck(req, res);

			spy.calledOnce.should.be.true;
			spy.calledWith(200).should.be.true;
		});
	});

	describe('Todo Tests', function() {
		it("should get all todos", function() {
			var req = {};
			var res = {};
			var spy = res.json = sinon.spy();
			req.user = test.generatedUser;

			test.userService.getAllTodos(req, res);

			spy.calledOnce.should.be.true;
			spy.calledWith(req.user.todos).should.be.true;
		});

		it("should create todo", function() {
			var req = {};
			var res = {};
			var spy = res.json = sinon.spy();
			req.user = test.generatedUser;
			req.body = {description: 'testDescription'};

			test.userService.createTodo(req, res);

			spy.calledOnce.should.be.true;
			spy.calledWith(req.user.todos[req.user.todos.length-1]).should.be.true;
			req.user.todos.should.have.lengthOf(2);
		});

		it("should update todo", function() {
			var req = {};
			var res = {};
			var testUser = test.createTestUser();
			var oldTodo = JSON.parse(JSON.stringify(testUser.todos[0]));
			var newTodo = JSON.parse(JSON.stringify(testUser.todos[0]));
			var spy = res.json = sinon.spy();
			newTodo.done = true;
			req.body = newTodo;
			req.user = testUser;
 
			test.userService.updateTodo(req, res);

			spy.calledOnce.should.be.true;
			spy.calledWith(newTodo).should.be.true;
			req.user.todos[0].should.not.eql(oldTodo);
			req.user.todos[0].should.eql(newTodo);
		});

		it("should delete todo", function() {
			var req = {};
			var res = {};
			var testUser = test.createTestUser();
			var spy = res.sendStatus = sinon.spy();
			req.params = {id: testUser.todos[0]._id};
			req.user = testUser;
 
			test.userService.deleteTodo(req, res);

			spy.calledOnce.should.be.true;
			spy.calledWith(204).should.be.true;
			req.user.todos.should.have.lengthOf(0);
		});
	});
});