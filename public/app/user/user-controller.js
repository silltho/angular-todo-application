angular.module('todoApplication').controller('userController',
	['$scope', '$http', '$location', 'userService', 'currentUser', function ($scope, $http, $location, userService, currentUser) {
		if (currentUser) {
			$scope.currentUser = currentUser.data;
		}

		this.loggoutUser = function () {
			userService.logout();
		};
	}]);