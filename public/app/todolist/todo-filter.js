angular.module('todoApplication').filter('done', function () {
	return function (input) {
		var filtered = [];
		angular.forEach(input, function (obj) {
			if (obj.done && obj.done != null) {
				filtered.push(obj);
			}
		});
		return filtered;
	}
});

angular.module('todoApplication').filter('undone', function () {
	return function (input) {
		var filtered = [];
		angular.forEach(input, function (obj) {
			if (!obj.done && obj.done != null) {
				filtered.push(obj);
			}
		});
		return filtered;
	}
});
