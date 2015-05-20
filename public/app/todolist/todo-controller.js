angular.module('todoApplication').controller('todosController',
	['$scope', '$http', 'Todo', 'userService', 'currentUser', function ($scope, $http, Todo, userService, currentUser) {
		$scope.currentUser = currentUser.data;
		$scope.todos = currentUser.data.todos;

		this.loggoutUser = function () {
			userService.logout();
		};

		this.addToDo = function (toDo) {
			var toDoToAdd = new Todo();
			toDoToAdd.description = toDo.description;
			toDoToAdd.$save().then(function (data) {
				$scope.todos.push(data);
				$scope.toDoAdd = null;
			});
		};

		this.deleteToDo = function (toDo) {
			var index = $scope.allToDos.indexOf(toDo);
			if (index != -1) {
				toDo.$delete().then(function (data) {
					$scope.todos.splice(index, 1);
				});
			}
		};

		this.updateToDo = function (toDo) {
			if (toDo instanceof Todo) {
				toDo.$update().then(function (data) {
					toDo.editing = false;
				});
			}
		};
	}]);
