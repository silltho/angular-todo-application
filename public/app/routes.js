angular.module('todoApplication').config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/login', {
		controller: 'loginController',
		templateUrl: '/app/user/login.html'
	}).when('/signup', {
		controller: 'loginController',
		templateUrl: '/app/user/signup.html'
	}).when('/services', {
		templateUrl: '/app/todolist/services.html'
	}).otherwise({
		controller: 'toDoController',
		templateUrl: '/app/todolist/todolist.html',
		resolve: {
			currentUser: ['userService', function (userService) {
				return userService.currentUser();
			}]
		}
	});
}]);
