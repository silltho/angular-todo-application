var User = require('../model/user');
var should = require('should');

module.exports = function UserService(userDAO, passport){
	userDAO.should.be.ok;
	passport.should.be.ok;
	var userDAO = userDAO;

	this.signup = function(req, res) {
		should.exist(req.user.username);
		res.sendStatus.should.be.a.function;
		console.log('signup: ' + req.user.username + ' in service/user-service.js');
		res.sendStatus(200);
	}

	this.login = function(req, res) {
		should.exist(req.user.username);
		res.sendStatus.should.be.a.function;
		console.log('login successfull, welcome ' + req.user.username + ' in service/user-service.js');
		res.sendStatus(200);
	}

	this.loginCheck = function(req, res) {
		res.sendStatus.should.be.a.function;
		if(auth(req) == true) {
			res.sendStatus(200);
		} else {
			res.sendStatus(401);
		}
	}

	this.getAllTodos = function(req, res) {
		debugger;
		should.exist(req.user.todos);
		res.json.should.be.a.function;
		res.json(req.user.todos);
	}

	this.createTodo = function(req, res) {
		should.exist(req.body.description);
		req.user.createTodo.should.be.a.function;
		res.json.should.be.a.function;
		if(checkRequestForUser(req)) {
			var newTodo = req.user.createTodo(req.body.description);
			userDAO.updateUser(req.user);
			res.json(newTodo);
		}
	}

	this.updateTodo = function(req, res) {
		should.exist(req.body);
		req.user.updateTodo.should.be.a.function;
		res.json.should.be.a.function;
		if(checkRequestForUser(req)) {
			var updatedTodo = req.user.updateTodo(req.body);
			userDAO.updateUser(req.user);
			res.json(updatedTodo);
		}
	}

	this.deleteTodo = function(req, res) {
		should.exist(req.params.id);
		req.user.deleteTodo.should.be.a.function;
		res.sendStatus.should.be.a.function;
		if(checkRequestForUser(req)) {
			req.user.deleteTodo(req.params.id);
			userDAO.updateUser(req.user);
			console.log('delete successfull return http-status 204 in service/user-service.js');
			res.sendStatus(204);
		}
	}
};

function checkRequestForUser(req) {
	should.exist(req.user);
	req.user.should.be.instanceof.User;
	return true;
}

function auth(req) {
	should.exist(req);
	if (!req.isAuthenticated()) {
		console.error(req.user.username + ' is not authenticate in service/user-service.js'); 
		return false;
	} else { 
		console.log(req.user.username + ' successfully authenticate in service/user-service.js'); 
		return true
	}
};