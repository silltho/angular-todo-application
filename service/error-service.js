var should = require('should');


module.exports = function ErrorService(log) {
	should.exist(log);

	this.logError = function (err, req, res, next) {
		log.error(err);
		next(err);
	};

	this.responseError = function (err, req, res, next) {
		switch (err.errorType) {
			case 'loginError':
				res.status(403);
				break;
			case 'signupError':
				res.status(409);
				break;
			default:
				res.status(500);
				break;
		}
		res.json({
			errorType: err.errorType,
			message: err.message
		});
		next(err);
	};
};
