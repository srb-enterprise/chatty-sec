var express = require('express');
var chatCtrl = require('../controller/chatCtrl')
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport, io){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
			if (req.isAuthenticated()) {
				res.redirect('/home');
			} else {
				res.render('login', { message: req.flash('message') });
			}
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res) {
		console.log("Sending user to home");
		res.render('home', { user: req.user });
	});

	/* GET Dash Page */
	router.get('/dash', isAuthenticated, function(req, res) {
		res.render('dash', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	/* GET chat window page */
	router.get('/chat', function(req, res){
		res.render('chatWindow', {user: req.user});
	});

	// socket.io events
	chatCtrl(io);

	return router;
}
