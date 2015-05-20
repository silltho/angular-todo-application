angular.module('todoApplication').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/todolist');

	$stateProvider
		.state('todolist', {
			abstract: true,
			templateUrl: '/app/todolist/todolist.html',
			controller: 'todosController',
			controllerAs: 'todoCtrl',
			resolve: {
				todos: ['Todo', function (Todo) {
					return Todo.query();
				}]
			}
		})
		.state('todolist.userpanel', {
			url: '/todolist',
			templateUrl: '/app/user/user-panel.html',
			controller: 'userController',
			controllerAs: 'userCtrl',
			resolve: {
				currentUser: ['userService', function (userService) {
					return userService.currentUser();
				}]
			}
		})
		.state('services', {
			url: '/services',
			templateUrl: '/app/todolist/services.html'
		})
		.state('login', {
			url: '/login',
			templateUrl: '/app/user/login.html',
			controller: 'userController',
			controllerAs: 'userCtrl'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: '/app/user/signup.html',
			controller: 'userController',
			controllerAs: 'userCtrl'
		});
}]);
