angular.module('todoApplication').controller('loginController',
	['$scope', '$http', '$location', 'User', function ($scope, $http, $location, User) {
		$scope.user = {};

		$scope.login = function (username, password) {
			User.login(username, password)
				.then(function () {
					$location.path("/todolist");
				}).catch(function (data) {
					$scope.login_form.loginError = data;
				}).finally(function () {
					$scope.login_form.submitted = true;
				});
		};

		$scope.signup = function (username, password, firstName, lastName, email) {
			User.signup(username, password, firstName, lastName, email)
				.then(function () {
					$location.path("/todolist");
				}).catch(function (data) {
					$scope.signup_form.signupError = data;
				}).finally(function () {
					$scope.signup_form.submitted = true;
				});
		};
	}]);