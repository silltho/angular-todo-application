angular.module('todoApplication').controller('todosController',
	['$scope', 'todoService', 'todos', function ($scope, todoService, todos) {
		$scope.todos = todos;

		this.addToDo = function (todo) {
			todoService.createTodo(todo).then(function (data) {
				$scope.todos.push(data);
				$scope.toDoAdd = null;
			});
		};

		this.deleteToDo = function (todo) {
			var index = $scope.todos.indexOf(todo);
			if (index != -1) {
				todoService.deleteTodo(todo).then(function () {
					$scope.todos.splice(index, 1);
				});
			}
		};

		this.updateToDo = function (todo) {
			todoService.updateTodo(todo).catch(function () {
				todo.editing = true;
			});
		};
	}]);
