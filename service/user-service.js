var UserDAO = require('../dao/user-dao');
var passport = require('passport');
var User = require('../model/user');

var testuserdao = new UserDAO('test');

module.exports = {

	userDAO: new UserDAO('test'),

	signup: function(req, res) {
		console.log('signup: ' + req.user.username + ' in service/user-service.js');
		res.sendStatus(200);
	},

	login: function(req, res) {
		console.log('login successfull, welcome ' + req.user.username + ' in service/user-service.js');
		res.sendStatus(200);
	},

	loginCheck: function(req, res) {
		if(auth(req) == true) {
			res.sendStatus(200);
		} else {
			res.sendStatus(401);
		}
	},

	getAllTodos: function(req, res) {
		res.json(req.user.todos);
	},

	createTodo: function(req, res) {
		if(checkRequestForUser(req)) {
			var newTodo = req.user.createTodo(req.body.description);
			this.userDAO.updateUser(req.user);
			res.json(newTodo);
		}
	},

	updateTodo: function(req, res) {
		if(checkRequestForUser(req)) {
			var updatedTodo = req.user.updateTodo(req.body);
			this.userDAO.updateUser(req.user);
			res.json(updatedTodo);
		}
	},

	deleteTodo: function(req, res) {
		if(checkRequestForUser(req)) {
			req.user.deleteTodo(req.params.id);
			this.userDAO.updateUser(req.user);
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

/*router.post('/services/todos', auth, function(req, res, next) {
	var todo = req.body;
	todo.done = false;
	console.log('create todo with description=' + todo.description);
	db.insert(todo, function(err, todo) {
		if (err) return next(err);
		console.log('create successfull return todo');
		res.json(todo);
	});
});

router.put('/services/todos/:todo', auth, function(req, res, next) {
	var todo = req.body;
	console.log('update todo with id=' + todo._id);

	db.update({ _id:todo._id }, { $set: {description: todo.description, done: todo.done}}, function (err, todo) {
		if (err) return next(err);
	});
	console.log('update successfull return todo');
	res.json(todo);
});

router.delete('/services/todos/:id' ,auth ,function(req, res, next) {
	var id = req.params.id;
	console.log('delete todo with id=' + id);

	db.remove({ _id:id }, {}, function(err) {
		if (err) return next(err);
		console.log('delete successfull return status 204');
		res.sendStatus(204);
	});
});


var auth = function(req, res, next){ 
	if (!req.isAuthenticated()) {
		console.log('not authenticate send 401'); 
		res.sendStatus(401);
	} else { 
		console.log('authenticate'); 
		next();
	}
};*/