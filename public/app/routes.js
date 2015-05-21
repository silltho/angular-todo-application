angular.module('todoApplication').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/todolist');

	$stateProvider
		.state('app', {
			abstract: true,
			templateUrl: '/app/app.html'
		})
		.state('app.todolist', {
			url: '/todolist',
			views: {
				'content': {
					templateUrl: '/app/todolist/todolist.html',
					controller: 'todosController',
					controllerAs: 'todoCtrl',
					resolve: {
						todos: ['Todo', function (Todo) {
							return Todo.query();
						}]
					}
				},
				'userpanel': {
					templateUrl: '/app/user/user-panel.html',
					controller: 'userController',
					controllerAs: 'userCtrl',
					resolve: {
						currentUser: ['userService', function (userService) {
							return userService.currentUser();
						}]
					}
				}
			}
		})
		.state('services', {
			url: '/services',
			templateUrl: '/app/todolist/services.html'
		})
		.state('login', {
			abstract: true,
			templateUrl: '/app/user/login.html'
		})
		.state('login.signin', {
			url: '/signin',
			templateUrl: '/app/user/signin.html',
			controller: 'loginController',
			controllerAs: 'loginCtrl'
		})
		.state('login.signup', {
			url: '/signup',
			templateUrl: '/app/user/signup.html',
			controller: 'loginController',
			controllerAs: 'loginCtrl'
		});
}]);
