var should = require('should');
var request = require('supertest');
var express = require('express');

var Test = require('./test');
var test = {};
//var server = {};

describe('Routes Tests', function(done) {
	beforeEach(function() {
		test = new Test();
		//server = request.agent(test.app);
	});

	it('should send request to /', function(done) {
		test.server
			.get('/')
			.end(function(err,res){
				should.not.exist(err);
				res.status.should.eql(200);
				return done();
			});			
	});

	it('should send request to /login', function(done) {
		test.server
			.post('/login')
			.send(test.generatedUser)
			.end(function(err,res){
				should.not.exist(err);
				res.status.should.eql(200);
				return done();
			});			
	});

	it('should send request to /loggedin', function(done) {
		test.loginUser(function() {
			test.server
				.get('/loggedin')
				.end(function(err,res) {
					should.not.exist(err);
					res.status.should.eql(200);
					return done();
				});	
		});
	});

	it('should send request to /signup', function(done) {
		test.server
			.post('/signup')
			.send(test.createTestUser())
			.end(function(err,res){
				should.not.exist(err);
				res.status.should.eql(200);
				return done();
			});	
	});

	it('should send request to /services/todos', function(done) {
		test.loginUser(function() {
			test.server
				.get('/services/todos')
				.end(function(err,res){
					should.not.exist(err);
					res.status.should.eql(200);
					return done();
				});	
		});
	});

	it('should send request to /services/todos/:id', function(done) {
		test.server
			.put('/services/todos/:id')
			.end(function(err,res){
				should.not.exist(err);
				res.status.should.eql(200);
				return done();
			});	
	});
});