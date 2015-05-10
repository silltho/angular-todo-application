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

todoApplication.factory('User', function ($http, $location) {
	var currentUser;
	return {
		login: function (username, password) {
			$http.post('/login', {
				username: username,
				password: password
			}).success(function (user) {
				currentUser = user;
				$location.path("/todoapp");
			});
			/*.error(function (err) {
			 $location.path('/login').search({errorMessage: err});
			 });*/
		},
		signup: function (username, password, firstName, lastName, email) {
			$http.post('/signup', {
				username: username,
				password: password,
				firstName: firstName,
				lastName: lastName,
				email: email
			}).success(function () {
				$location.path("/login");
			}).error(function () {
				$location.path('/signup');
			});
		},
		logout: function () {
			$http.get('/logout').success(function () {
				currentUser = null;
				//$location.path("/#/login");
			});
		},
		currentUser: function () {
			var promise = $http.get('/loggedin')
				.success(function (data) {
					return data;
				})
				.error(function (data) {
					return false;
				});
			return promise;
		}
	};
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

todoApplication.controller('toDoController', function ($scope, $http, Todo, User) {

	$scope.init = function () {
		User.currentUser().then(function (promise) {
			$scope.currentUser = promise.data;
			$scope.allToDos = promise.data.todos;
		});
		$scope.User = User;
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

todoApplication.controller('loginController', function ($rootScope, $scope, $routeParams, User) {
	$scope.user = {};
	$scope.errorMessage = $routeParams.errorMessage;

	$scope.login = function (username, password) {
		User.login(username, password);
	};

	$scope.signup = function (username, password, firstName, lastName, email) {
		User.signup(username, password, firstName, lastName, email);
	};
});

todoApplication.config(function ($routeProvider, $locationProvider, $httpProvider) {
	var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
		var deferred = $q.defer();
		$http.get('/loggedin').success(function (user) {
			if (user !== '0')
				deferred.resolve();
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
				if (response.status === 401) {
					$location.url('/login').search({errorMessage: response.data.message});
				} else {
					$location.search({errorMessage: response.data.message});
				}
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
			templateUrl: '/html/todoapp.html'/*,
			 resolve: {login: checkLoggedin}*/
		});
});