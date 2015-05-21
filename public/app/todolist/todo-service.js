angular.module('todoApplication')
	.service('todoService', ['$http', 'Todo', function ($http, Todo) {
		return {
			createTodo: function (todo) {
				var newTodo = new Todo();
				newTodo.description = todo.description;
				return newTodo.$save();
			},
			updateTodo: function (todo) {
				if (todo instanceof Todo) {
					todo.editing = false;
					return todo.$update();
				}
			},
			deleteTodo: function (todo) {
				return todo.$delete();
			}
		};
	}]);
