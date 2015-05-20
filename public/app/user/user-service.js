angular.module('todoApplication')
	.service('userService', ['$http', '$location', '$q', function ($http, $location, $q) {

		return {
			login: function (username, password) {
				var deferred = $q.defer();
				$http.post('/login', {
					username: username,
					password: password
				}).success(function (data) {
					$location.path("/todolist");
					deferred.resolve(data);
				}).error(function (data) {
					deferred.reject(data);
				});
				return deferred.promise;
			},
			signup: function (username, password, firstName, lastName, email) {
				return $http.post('/signup', {
					username: username,
					password: password,
					firstName: firstName,
					lastName: lastName,
					email: email
				});
			},
			logout: function () {
				return $http.get('/logout');
			},
			currentUser: function () {
				return $http.get('/loggedin');
			}
		};
	}]);