angular.module('todoApplication').filter('done', function () {
	return function (item) {
		return item.done;
	}
});

angular.module('todoApplication').filter('undone', function () {
	return function (item) {
		return !item.done;
	}
});
