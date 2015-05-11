angular.module('todoApplication').controller('toDoController',
	['$scope', '$http', 'Todo', 'User', function ($scope, $http, Todo, User) {
		$scope.init = function () {
			User.currentUser().then(function (promise) {
				$scope.currentUser = promise.data;
				$scope.allToDos = promise.data.todos;
			});
			$scope.User = User;
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
			toDo.$update().then(function (data) {
				toDo.editing = false;
			});
		};

		$scope.filterDone = function (item) {
			if (item.done) {
				return true;
			}
			return false;
		};

		$scope.filterNotDone = function (item) {
			if (!item.done) {
				return true;
			}
			return false;
		};

		$scope.init();
	}]);
