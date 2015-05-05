var should = require('should');

var Test = require('./test');
var test = {};

describe('Routes Tests', function (done) {
	beforeEach(function () {
		test = new Test();
	});

	it('should send request to /', function (done) {
		test.server
			.get('/')
			.end(function (err, res) {
				should.not.exist(err);
				res.status.should.eql(200);
				return done();
			});
	});

	it('should send request to /login', function (done) {
		var testUser = test.createTestUser();
		test.signupTestUser(testUser, function (err, signupUser) {
			test.server
				.post('/login')
				.send(testUser)
				.end(function (err, res) {
					should.not.exist(err);
					res.status.should.eql(200);
					return done();
				});
		});
	});

	it('should send request to /loggedin', function (done) {
		test.loginUser(function (testUser) {
			test.server
				.get('/loggedin')
				.end(function (err, res) {
					should.not.exist(err);
					res.status.should.eql(200);
					return done();
				});
		});
	});

	it('should send request to /signup', function (done) {
		test.server
			.post('/signup')
			.send(test.createTestUser())
			.end(function (err, res) {
				should.not.exist(err);
				res.status.should.eql(200);
				return done();
			});
	});

	it('should send request to /services/todos', function (done) {
		test.loginUser(function () {
			test.server
				.get('/services/todos')
				.end(function (err, res) {
					should.not.exist(err);
					res.status.should.eql(200);
					return done();
				});
		});
	});

	it('should send request to /services/todos/:id', function (done) {
		var testTodo = {description: 'updatedDescription', done: true};
		test.loginUser(function (testUser) {
			test.server
				.put('/services/todos/' + testUser.todos[0]._id)
				.send(testTodo)
				.end(function (err, res) {
					should.not.exist(err);
					res.status.should.eql(200);
					res.body.description.should.eql(testTodo.description);
					res.body.done.should.eql(testTodo.done);
					return done();
				});
		});
	});
});