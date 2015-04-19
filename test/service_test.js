var should = require('should');
var sinon = require('sinon');
var UserService = require('../service/user-service');
var UserDAO = require('../dao/user-dao');
var User = require('../model/user');

var userDAO = new UserDAO('test');
var userService = new UserService(userDAO);

describe('Service Tests', function() {
	describe('User Tests', function() {
		it("should signup user", function() {
			var req = {};
			var res = {};
			var spy = res.sendStatus = sinon.spy();
			req.user = createTestUser();

			userService.signup(req, res);
			spy.calledOnce.should.be.true;
			spy.calledWith(200).should.be.true;
		});

		it("should login user", function() {
			var req = {};
			var res = {};
			var spy = res.sendStatus = sinon.spy();
			req.user = createTestUser();

			userService.login(req, res);
			spy.calledOnce.should.be.true;
			spy.calledWith(200).should.be.true;
		});

		it("should check login of user", function() {
			var req = {};
			var res = {};
			var spy = res.sendStatus = sinon.spy();
			req.user = createTestUser();
			req.isAuthenticated = function() {
				return true;
			};

			userService.loginCheck(req, res);
			spy.calledOnce.should.be.true;
			spy.calledWith(200).should.be.true;
		});
	});

	describe('Todo Tests', function() {
		it("should get all todos", function() {
			var req = {};
			var res = {};
			var spy = res.json = sinon.spy();
			req.user = createTestUser();

			userService.getAllTodos(req, res);

			spy.calledOnce.should.be.true;
			spy.calledWith(req.user.todos).should.be.true;
		});

		it("should create todo", function() {
			var req = {};
			var res = {};
			var spy = res.json = sinon.spy();
			req.user = createTestUser();
			req.body = {description: 'testDescription'};

			userService.createTodo(req, res);

			spy.calledOnce.should.be.true;
			spy.calledWith(req.user.todos[req.user.todos.length-1]).should.be.true;
			req.user.todos.should.have.lengthOf(2);
		});

		it("should update todo", function() {
			var req = {};
			var res = {};
			var testUser = createTestUser();
			var oldTodo = JSON.parse(JSON.stringify(testUser.todos[0]));
			var newTodo = JSON.parse(JSON.stringify(testUser.todos[0]));
			var spy = res.json = sinon.spy();
			newTodo.done = true;
			req.body = newTodo;
			req.user = testUser;
 
			userService.updateTodo(req, res);

			spy.calledOnce.should.be.true;
			spy.calledWith(newTodo).should.be.true;
			req.user.todos[0].should.not.eql(oldTodo);
			req.user.todos[0].should.eql(newTodo);
		});

		it("should delete todo", function() {
			var req = {};
			var res = {};
			var testUser = createTestUser();
			var spy = res.sendStatus = sinon.spy();
			req.params = {id: testUser.todos[0]._id};
			req.user = testUser;
 
			userService.deleteTodo(req, res);

			spy.calledOnce.should.be.true;
			spy.calledWith(204).should.be.true;
			req.user.todos.should.have.lengthOf(0);
		});
	});
});

function createTestUser(){
	var testUser = new User('testUsername', 'password', 'firstName', 'lastName', 'email');
	testUser.createTodo('description');
	return testUser;
}