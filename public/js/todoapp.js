var urlBase = window.location.origin + "/"
	+ window.location.pathname.split("/")[1];

var todoApplication = angular.module('todoApplication', ['ngRoute', 'ngResource']);


todoApplication.factory('Todo', function ($resource) {
	return $resource('services/todos/:id', {
		id: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
});

todoApplication.directive('ngEnter', function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if (event.which === 13) {
				scope.$apply(function () {
					scope.$eval(attrs.ngEnter);
				});

				event.preventDefault();
			}
		});
	};
});

todoApplication.directive('autofocusWhen', function ($timeout) {
	return {
		link: function (scope, element, attrs) {
			scope.$watch(attrs.autofocusWhen, function (newValue) {
				if (newValue) {
					$timeout(function () {
						element.focus();
						element.select();
					}, 100);
				}
			});
		}
	};
});

todoApplication.controller('toDoController', function ($scope, $http, Todo) {

	$scope.init = function () {
		$scope.allToDos = Todo.query();
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
});

todoApplication.controller('loginController', function ($rootScope, $scope, $http, $location, Todo) {
	$scope.user = {};
	// Register the login() function
	$scope.login = function () {
		$http.post('/login', {
			username: $scope.user.username,
			password: $scope.user.password,
		}).success(function (user) {
			// No error: authentication OK
			$rootScope.message = 'Authentication successful!';
			$location.path("/todoapp");
			console.log($location.path());
		}).error(function () {
			// Error: authentication failed
			$rootScope.message = 'Authentication failed.';
			$location.path('/login');
		});
	};

	$scope.signup = function () {
		$http.post('/signup', {
			username: $scope.user.username,
			password: $scope.user.password,
		}).success(function (user) {
			// No error: authentication OK
			$rootScope.message = 'Signup successful!';
			$location.path("/login");
		}).error(function () {
			// Error: authentication failed
			$rootScope.message = 'Signup failed.';
			$location.path('/signup');
		});
	};

});

todoApplication.config(function ($routeProvider, $locationProvider, $httpProvider) {
	var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
		// Initialize a new promise
		var deferred = $q.defer();
		// Make an AJAX call to check if the user is logged in
		$http.get('/loggedin').success(function (user) {
			// Authenticated
			if (user !== '0')
				deferred.resolve();
			// Not Authenticated
			else {
				$rootScope.message = 'You need to log in.';
				deferred.reject();
				$location.path('/login');
			}
		});
		return deferred.promise;
	};

	$httpProvider.interceptors.push(function ($q, $location) {
		return {
			response: function (response) {
				return response;
			},
			responseError: function (response) {
				if (response.status === 401)
					$location.url('/login');
				return $q.reject(response);
			}
		};
	});

	$routeProvider.when('/login', {
		controller: 'loginController',
		templateUrl: '/html/login.html'
	}).when('/signup', {
		controller: 'loginController',
		templateUrl: '/html/signup.html'
	})
		.when('/services', {
			templateUrl: '/html/services.html'
		}).otherwise({
			controller: 'toDoController',
			templateUrl: '/html/todoapp.html',
			resolve: {login: checkLoggedin}
		});
});