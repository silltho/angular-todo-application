angular.module('todoApplication').controller('loginController',
	['$scope', '$state', '$http', '$location', 'userService', function ($scope, $state, $http, $location, userService) {

		this.login = function (username, password) {
			userService.login(username, password)
				.success(function (data) {
					$state.transitionTo('login.signin', {currentUser: data});
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