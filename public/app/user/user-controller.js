angular.module('todoApplication').controller('loginController',
	['$scope', '$http', '$location', 'userService', function ($scope, $http, $location, userService) {
		$scope.login = function (username, password) {
			userService.login(username, password)
				.then(function () {
					$location.path("/todolist");
				}).catch(function (data) {
					$scope.login_form.loginError = data;
				});
		};

		$scope.signup = function (username, password, firstName, lastName, email) {
			userService.signup(username, password, firstName, lastName, email)
				.then(function () {
					$location.path("/todolist");
				}).catch(function (data) {
					$scope.signup_form.signupError = data;
				}).finally(function () {
					$scope.signup_form.submitted = true;
				});
		};
	}]);