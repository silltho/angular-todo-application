angular.module('todoApplication').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/todolist');

	$stateProvider
		.state('todolist', {
			url: '/todolist',
			templateUrl: '/app/todolist/todolist.html',
			controller: 'todosController',
			controllerAs: 'todoCtrl',
			resolve: {
				currentUser: ['userService', function (userService) {
					return userService.currentUser();
				}]
			}
		})
		.state('todolist.services', {
			url: '/todolist/services',
			templateUrl: '/app/todolist/services.html',
			controller: 'todosController',
			controllerAs: 'todoCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: '/app/user/login.html',
			controller: 'userController'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: '/app/user/signup.html',
			controller: 'userController'
		});
	/*$routeProvider.when('/login', {
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
	 });*/
}]);
