angular.module('todoApplication').controller('userController',
	['$scope', '$http', '$location', 'userService', '$injector', function ($scope, $http, $location, userService, $injector) {
		if ($injector.has('currentUser')) {
			$scope.currentUser = $injector.get('currentUser').data;
		}

		this.loggoutUser = function () {
			userService.logout();
		};

		this.login = function (username, password) {
			userService.login(username, password)
				.success(function (data) {
					$scope.currentUser = data;
					$location.path("/todolist");
				}).error(function (data) {
					$scope.login_form.loginError = data;
				});
		};

		this.signup = function (username, password, firstName, lastName, email) {
			userService.signup(username, password, firstName, lastName, email)
				.success(function (data) {
					$scope.currentUser = data;
					$location.path("/todolist");
				}).error(function (data) {
					$scope.signup_form.signupError = data;
				}).finally(function () {
					$scope.signup_form.submitted = true;
				});
		};
	}]);