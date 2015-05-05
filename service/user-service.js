var should = require('should');
var User = require('../model/user');


module.exports = function UserService(userDAO, passport, log) {
	should.exist(userDAO);
	should.exist(passport);
	should.exist(log);

	this.signup = function (req, res) {
		should.exist(req.user.username);
		res.sendStatus.should.be.a.function;
		log.info({'function': 'signup'}, 'successful signup user %s', req.user.username);
		res.sendStatus(200);
	};

	this.login = function (req, res) {
		should.exist(req.user.username);
		res.sendStatus.should.be.a.function;
		log.info({'function': 'login'}, 'successful login user %s', req.user.username);
		res.sendStatus(200);
	};

	this.loginCheck = function (req, res) {
		res.sendStatus.should.be.a.function;
		if (auth(req) == true) {
			res.sendStatus(200);
		} else {
			res.sendStatus(401);
		}
	};

	this.getAllTodos = function (req, res) {
		should.exist(req.user.todos);
		res.json.should.be.a.function;
		res.json(req.user.todos);
	};

	this.createTodo = function (req, res) {
		should.exist(req.body.description);
		res.json.should.be.a.function;

		var user = getUserFromRequest(req);
		var newTodo = user.createTodo(req.body.description);
		userDAO.updateUser(user, function (err, numReplaced) {
			res.json(newTodo);
		});
	};

	this.updateTodo = function (req, res) {
		should.exist(req.body);
		res.json.should.be.a.function;

		var user = getUserFromRequest(req);
		var todo = req.body;
		todo._id = req.params.id;

		if (user) {
			var updatedTodo = user.updateTodo(todo);
			userDAO.updateUser(user, function (err, numReplaced) {
				res.json(updatedTodo);
			});
		}
	};

	this.deleteTodo = function (req, res) {
		should.exist(req.params.id);
		res.sendStatus.should.be.a.function;

		var user = getUserFromRequest(req);
		user.deleteTodo(req.params.id);
		userDAO.updateUser(user, function (err, numReplaced) {
			log.info({'function': 'deleteTodo'}, 'successful delete todo send 204');
			res.sendStatus(204);
		});
	};

	function getUserFromRequest(req) {
		should.exist(req.user);
		if (req.user instanceof User) {
			return req.user;
		}
		else {
			req.user.__proto__ = User.prototype;
			return req.user;
		}
	}
	function auth(req) {
		should.exist(req);
		if (!req.isAuthenticated()) {
			log.info({'function': 'auth'}, '%s is not authenticated', req.user.username);
			return false;
		} else {
			log.info({'function': 'auth'}, '%s is authenticated', req.user.username);
			return true
		}
	}
};