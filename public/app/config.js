angular.module('todoApplication').config(['$httpProvider', function ($httpProvider) {
	$httpProvider.interceptors.push(function ($q, $location) {
		return {
			response: function (response) {
				return response;
			},
			responseError: function (response) {
				if (response.status === 401) {
					$location.path('/login').search({errorMessage: response.data.message});
				} else {
					//$location.search({errorMessage: response.data.message});
				}
				return $q.reject(response);
			}
		};
	});
}]);