var User = require('../model/user');
var should = require('should');

module.exports = function UserService(userDAO, passport, log) {
	should.exist(userDAO);
	should.exist(passport);
	should.exist(log);


	this.signup = function(req, res) {
		should.exist(req.user.username);
		res.sendStatus.should.be.a.function;
		log.info({'function': 'signup'}, 'successful signup user %s', req.user.username);
		res.sendStatus(200);
	};

	this.login = function(req, res) {
		should.exist(req.user.username);
		res.sendStatus.should.be.a.function;
		log.info({'function': 'login'}, 'successful login user %s', req.user.username);
		res.sendStatus(200);
	};

	this.loginCheck = function(req, res) {
		res.sendStatus.should.be.a.function;
		if(auth(req) == true) {
			res.sendStatus(200);
		} else {
			res.sendStatus(401);
		}
	};

	this.getAllTodos = function(req, res) {
		should.exist(req.user.todos);
		res.json.should.be.a.function;
		res.json(req.user.todos);
	};

	this.createTodo = function(req, res) {
		should.exist(req.body.description);
		res.json.should.be.a.function;
		if(checkRequestForUser(req)) {
			var newTodo = req.user.createTodo(req.body.description);
			userDAO.updateUser(req.user);
			res.json(newTodo);
		}
	};

	this.updateTodo = function(req, res) {
		should.exist(req.body);
		res.json.should.be.a.function;
		if(checkRequestForUser(req)) {
			var updatedTodo = req.user.updateTodo(req.body);
			userDAO.updateUser(req.user);
			res.json(updatedTodo);
		}
	};

	this.deleteTodo = function(req, res) {
		should.exist(req.params.id);
		res.sendStatus.should.be.a.function;
		if(checkRequestForUser(req)) {
			req.user.deleteTodo(req.params.id);
			userDAO.updateUser(req.user);
			log.info({'function': 'deleteTodo'}, 'successful delete todo send 204');
			res.sendStatus(204);
		}
	};

	function checkRequestForUser(req) {
		should.exist(req.user);
		req.user.should.be.instanceof.User;
		return true;
	};

	function auth(req) {
		should.exist(req);
		if (!req.isAuthenticated()) {
			log.info({'function': 'auth'}, '%s is not authenticated', req.user.username);
			return false;
		} else {
			log.info({'function': 'auth'}, '%s is authenticated', req.user.username);
			return true
		}
	};
};