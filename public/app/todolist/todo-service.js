angular.module('todoApplication').factory('Todo', ['$resource', function ($resource) {
	return $resource('services/todos/:id',
		{id: '@_id'},
		{
			update: {method: 'PUT'}
		});
}]);