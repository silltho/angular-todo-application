var should = require('should');
var request = require('supertest')
var express = require('express');

var Test = require('./test');
var test = {};
var server = {};
var cookie = {};

describe('Routes Tests', function(done) {
	/*beforeEach(function() {
		test = new Test();
		server = request.agent(test.app);
	});

	it('should send request to /', function(done) {
		request(test.app)
			.get('/')
			.end(function(err,res){
				if(err) {
					return done(err);
				}
				res.should.have.status(200);
				return done();
			});			
	});

	it('should send request to /login', function(done) {
		request(test.app)
			.get('/')
			.send(test.generatedUser)
			.end(function(err,res){
				if(err) {
					return done(err);
				}
				res.should.have.status(200);
				return done();
			});			
	});

	it('should send request to /signup', function(done) {
		server
			.post('/signup')
			.send(test.createTestUser())
			.end(function(err,res){
				if(err) {
					return done(err);
				}
				res.should.have.status(200);
				cookie = res.headers['set-cookie'];
				return done();
			});	
	});

	it('should send request to /services/todos', function(done) {
		request(test.app)
			.put('/services/todos')
			.end(function(err,res){
				if(err) {
					return done(err);
				}
				res.should.have.status(200);
				cookie = res.headers['set-cookie'];
				return done();
			});	
	});

	it('should send request to /services/todos/:id', function(done) {
		request(test.app)
			.put('/services/todos/:id')
			.end(function(err,res){
				if(err) {
					return done(err);
				}
				res.should.have.status(200);
				cookie = res.headers['set-cookie'];
				return done();
			});	
	});*/
});

