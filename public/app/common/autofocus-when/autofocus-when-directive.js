angular.module('todoApplication').directive('autofocusWhen', ['$timeout', function ($timeout) {
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
}]);