var Todo = require('./todo');

module.exports = function User(username, password, firstName, lastName, email){
	var username = username;
	var password = password;
	var firstName = firstName;
	var lastName = lastName;
	var email = email

	var todos = [];

	Object.defineProperty(this, 'username', {
		get : function () {
			return username;
		}
	});

	Object.defineProperty(this, 'password', {
		get : function () {
			return password;
		},
		set : function (value) {
			password = value;
		}
	});

	Object.defineProperty(this, 'fullName', {
		get : function () {
			return firstName + ' ' + lastName;
		}
	});

	Object.defineProperty(this, 'email', {
		get : function () {
			return email;
		},
		set : function (value) {
			email = value;
		}
	});

	Object.defineProperty(this, 'todos', {
		get : function () {
			return todos;
		}
	});

	this.createTodo = function(description) {
		var newTodo = new Todo(description);
		todos.push(newTodo);
		return todos;
	}

	this.getTodoById = function(id) {
		var todoIndex = getArrayIndexOfTodoById(id);
		return todos[todoIndex];
	}

	this.updateTodo = function(todo) {
		var todoIndex = getArrayIndexOfTodoById(todo._id);
		return todos[todoIndex] = todo;
	}

	this.deleteTodo = function(id) {
		var todoIndex = getArrayIndexOfTodoById(id);
		todos.splice(todoIndex, 1);
		return todos;
	}

	function getArrayIndexOfTodoById(id) {
		var lookup = {};
		for (var i = 0, len = todos.length; i < len; i++) {
			lookup[todos[i]._id] = i;
		}
		if(typeof lookup[id] != 'undefined') {
			console.log('found todo with id = ' + id + ' in models/user.js');
			return lookup[id];	
		}
		console.log('no todo found with id = ' + id + ' in models/user.js');
		throw 'no todo found with id = ' + id + ' in models/user.js';
	}
};