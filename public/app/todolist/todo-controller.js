angular.module('todoApplication').controller('toDoController',
	['$scope', '$http', 'Todo', 'userService', 'currentUser', function ($scope, $http, Todo, userService, currentUser) {
		$scope.currentUser = currentUser.data;
		$scope.allToDos = currentUser.data.todos;

		$scope.loggoutUser = function () {
			userService.logout();
		};

		$scope.addToDo = function (toDo) {
			var toDoToAdd = new Todo();
			toDoToAdd.description = toDo.description;
			toDoToAdd.$save().then(function (data) {
				$scope.allToDos.push(data);
				$scope.toDoAdd = null;
			});
		};

		$scope.deleteToDo = function (toDo) {
			var index = $scope.allToDos.indexOf(toDo);
			if (index != -1) {
				toDo.$delete().then(function (data) {
					$scope.allToDos.splice(index, 1);
				});
			}
		};

		$scope.updateToDo = function (toDo) {
			if (toDo instanceof Todo) {
				toDo.$update().then(function (data) {
					toDo.editing = false;
				});
			}
		};

		$scope.filterDone = function (item) {
			return item.done;
		};

		$scope.filterNotDone = function (item) {
			return !item.done;
		};
	}]);
