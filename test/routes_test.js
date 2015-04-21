var should = require('should');
var request = require('supertest')
var express = require('express');

var Test = require('./test');
var test = {};

describe('Routes Tests', function(done) {
	beforeEach(function() {
		test = new Test();
	});

	it('should send request to /', function(done) {
		request(test.app)
			.get('/')
			.expect(200, done);
	});

	it('should send request to /signup', function(done) {
		request(test.app)
			.post('/signup')
			.send()
			.expect(200, done);
	});

	it('should send request to /services/todos', function(done) {
		request(test.app)
			.put('/services/todos')
			.expect(200, done);
	});

	it('should send request to /services/todos/:id', function(done) {
		request(test.app)
			.put('/services/todos/:id')
			.expect(200, done);
	});
});