var express = require('express');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');

module.exports = function Router(app, passport, userService) {
	var router = express.Router();

	router.get('/', function(req, res, next) {
		console.log('render index.ejs');
		res.sendStatus(200);
		next();
	});

	router.post('/signup',passport.authenticate('signup'), userService.signup);

	router.post('/login',passport.authenticate('login'), userService.login);

	router.get('/loggedin', userService.loginCheck);

	router.get('/services/todos', auth, userService.getAllTodos);

	router.post('/services/todos', auth, userService.createTodo);

	router.put('/services/todos/:id', auth, userService.updateTodo);

	router.delete('/services/todos/:id', auth, userService.deleteTodo);


	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(expressSession({secret: 'mySecretKey'}));
	app.use(cookieParser());

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(router);
}

var auth = function(req, res, next){ 
	if (!req.isAuthenticated()) {
		console.log('not authenticate send 401'); 
		res.sendStatus(401);
	} else { 
		console.log('authenticate'); 
		next();
	}
};