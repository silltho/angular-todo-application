angular.module('todoApplication').config(['$httpProvider', '$injector', function ($httpProvider) {
	$httpProvider.interceptors.push(function ($q, $injector) {
		return {
			response: function (response) {
				return response;
			},
			responseError: function (response) {
				if (response.status === 401) {
					$injector.get('$state').transitionTo('login.signin', {errorMessage: response.data.message});
				}
				return $q.reject(response);
			}
		};
	});
}]);