angular.module('todoApplication')
	.service('userService', ['$http', '$location', '$q', function ($http, $location, $q) {
		return {
			login: function (username, password) {
				return $http.post('/login', {
					username: username,
					password: password
				});
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