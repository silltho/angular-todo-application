angular.module('todoApplication').factory('User',
	['$http', '$location', '$q', function ($http, $location, $q) {
		var currentUser;
		return {
			login: function (username, password) {
				var deferred = $q.defer();
				$http.post('/login', {
					username: username,
					password: password
				}).success(function (data) {
					currentUser = data;
					$location.path("/todolist");
				}).error(function (data) {
					deferred.reject(data);
				});
				return deferred.promise;
			},
			signup: function (username, password, firstName, lastName, email) {
				var deferred = $q.defer();
				$http.post('/signup', {
					username: username,
					password: password,
					firstName: firstName,
					lastName: lastName,
					email: email
				}).success(function (data) {
					currentUser = data;
					deferred.resolve(data);
				}).error(function (data) {
					deferred.reject(data);
				});
				return deferred.promise;
			},
			logout: function () {
				$http.get('/logout').success(function () {
					currentUser = null;
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
	}]);