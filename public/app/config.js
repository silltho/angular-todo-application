angular.module('todoApplication').config(['$httpProvider', '$injector', function ($httpProvider, $injector) {
	$httpProvider.interceptors.push(function ($q, $location, $injector) {
		return {
			response: function (response) {
				return response;
			},
			responseError: function (response) {
				if (response.status === 401) {
					$injector.get('$state').transitionTo('login', {errorMessage: response.data.message});
					//$location.path('/login').search({errorMessage: response.data.message});
				}
				return $q.reject(response);
			}
		};
	});
}]);