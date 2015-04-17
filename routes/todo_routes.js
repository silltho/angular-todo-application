var UserDAO = require('../db/userDAO');
var passport = require('passport');

module.exports = {

	var userDAO = new UserDAO('test');

	function signup() {
		passport.authenticate('signup'),
  			function(req, res) {
    		console.log('register ' + req.user.username);
    		res.sendStatus(200);
		}
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

router.post('/login',
	passport.authenticate('login'),
	function(req, res) {
		console.log('welcome ' + req.user.username);
		res.sendStatus(200);
	}
);

router.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

router.post('/signup',
	passport.authenticate('signup'),
  	function(req, res) {
    	console.log('register ' + req.user.username);
    	res.sendStatus(200);
	}
);

var auth = function(req, res, next){ 
	if (!req.isAuthenticated()) {
		console.log('not authenticate send 401'); 
		res.sendStatus(401);
	} else { 
		console.log('authenticate'); 
		next();
	}
};*/