var Todo = require('./todo');

function User(username, password, firstName, lastName, email){
	this._id = 'notsaved';
	this.username = username;
	this.password = password;
	this.firstName = firstName;
	this.lastName = lastName;
	this.email = email

	this.todos = [];
}

User.prototype.createTodo = function(description) {
	var newTodo = new Todo(description);
	this.todos.push(newTodo);
	return newTodo;
}

User.prototype.getTodoById = function(id) {
	var todoIndex = getArrayIndexById(id, this.todos);
	return this.todos[todoIndex];
}

User.prototype.updateTodo = function(todo) {
	var todoIndex = getArrayIndexById(todo._id, this.todos);
	return this.todos[todoIndex] = todo;
}

User.prototype.deleteTodo = function(id) {
	var todoIndex = getArrayIndexById(id, this.todos);
	this.todos.splice(todoIndex, 1);
	return this.todos;
}

function getArrayIndexById(id, array) {
	var lookup = {};
	for (var i = 0, len = array.length; i < len; i++) {
		lookup[array[i]._id] = i;
	}
	if(typeof lookup[id] != 'undefined') {
		console.log('found todo with id = ' + id + ' in models/user.js');
		return lookup[id];
	}
	console.error('no todo found with id = ' + id + ' in models/user.js');
	throw 'no todo found with id = ' + id + ' in models/user.js';
}

module.exports = User;