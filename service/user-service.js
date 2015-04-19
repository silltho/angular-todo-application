var passport = require('passport');
var User = require('../model/user');

module.exports = function UserService(userDAO){
	var userDAO = userDAO;

	this.signup = function(req, res) {
		console.log('signup: ' + req.user.username + ' in service/user-service.js');
		res.sendStatus(200);
	}

	this.login = function(req, res) {
		console.log('login successfull, welcome ' + req.user.username + ' in service/user-service.js');
		res.sendStatus(200);
	}

	this.loginCheck = function(req, res) {
		if(auth(req) == true) {
			res.sendStatus(200);
		} else {
			res.sendStatus(401);
		}
	}

	this.getAllTodos = function(req, res) {
		res.json(req.user.todos);
	}

	this.createTodo = function(req, res) {
		if(checkRequestForUser(req)) {
			var newTodo = req.user.createTodo(req.body.description);
			userDAO.updateUser(req.user);
			res.json(newTodo);
		}
	}

	this.updateTodo = function(req, res) {
		if(checkRequestForUser(req)) {
			var updatedTodo = req.user.updateTodo(req.body);
			userDAO.updateUser(req.user);
			res.json(updatedTodo);
		}
	},

	this.deleteTodo = function(req, res) {
		if(checkRequestForUser(req)) {
			req.user.deleteTodo(req.params.id);
			userDAO.updateUser(req.user);
			console.log('delete successfull return http-status 204 in service/user-service.js');
			res.sendStatus(204);
		}
	}
};

function checkRequestForUser(req){
	if(req.user instanceof User) {
		return true;
	} else {
		console.error('req.user needs to be a instance of User in service/user-service.js');
		throw 'req.user needs to be a instance of User in service/user-service.js';
	}
}

function auth(req){ 
	if (!req.isAuthenticated()) {
		console.error(req.user.username + ' is not authenticate in service/user-service.js'); 
		return false;
	} else { 
		console.log(req.user.username + ' successfully authenticate in service/user-service.js'); 
		return true
	}
};