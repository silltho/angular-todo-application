var express = require('express');
var should = require('should');

module.exports = function Router(app, passport, userService, log) {
	should.exist(app);
	should.exist(passport);
	should.exist(userService);
	should.exist(log);

	this.router = express.Router();
	var auth = function (req, res, next) {
		if (!req.isAuthenticated()) {
			log.info({'function': 'auth'}, 'not authenticate send 401');
			res.sendStatus(401);
		} else {
			next();
		}
	};

	this.router.get('/', function (req, res, next) {
		log.info('render index.ejs');
		res.render('index');
		next();
	});

	this.router.post('/signup', passport.authenticate('signup'), userService.signup);

	this.router.post('/login', passport.authenticate('login'), userService.login);

	this.router.get('/loggedin', auth, userService.loginCheck);

	this.router.get('/logout', userService.logout);

	this.router.get('/services/todos', auth, userService.getAllTodos);

	this.router.post('/services/todos', auth, userService.createTodo);

	this.router.put('/services/todos/:id', auth, userService.updateTodo);

	this.router.delete('/services/todos/:id', auth, userService.deleteTodo);


};