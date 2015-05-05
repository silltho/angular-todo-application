var Todo = require('./todo');
var should = require('should');

function User(username, password, firstName, lastName, email) {
	this.username = username;
	this.password = password;
	this.firstName = firstName;
	this.lastName = lastName;
	this.email = email;

	this.todos = [];
}

User.prototype.createTodo = function (description) //noinspection BadExpressionStatementJS
{
	description.should.be.ok;
	var newTodo = new Todo(description);
	this.todos.push(newTodo);
	return newTodo;
};

User.prototype.getTodoById = function (id) {
	id.should.be.ok;
	var todoIndex = getArrayIndexById(id, this.todos);
	return this.todos[todoIndex];
};

User.prototype.updateTodo = function (todo) {
	todo.should.be.ok;
	todo._id.should.be.ok;
	var todoIndex = getArrayIndexById(todo._id, this.todos);
	return this.todos[todoIndex] = todo;
};

User.prototype.deleteTodo = function (id) {
	id.should.be.ok;
	var todoIndex = getArrayIndexById(id, this.todos);
	this.todos.splice(todoIndex, 1);
	return this.todos;
};

function getArrayIndexById(id, array) {
	array.should.be.ok;
	id.should.be.ok;
	var lookup = {};
	for (var i = 0, len = array.length; i < len; i++) {
		lookup[array[i]._id] = i;
	}
	if (typeof lookup[id] != 'undefined') {
		return lookup[id];
	}
	throw new Error('no todo found with id = ' + id + ' in models/user.js#getArrayIndexById');
}

module.exports = User;