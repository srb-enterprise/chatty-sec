var login = require('./login');
var signup = require('./registration');
var User = require('../models/user');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');console.log(user);
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        // User.findById(id, function(err, user) {
        //     console.log('deserializing user:',user);
        //
        // });
        done(null, user);
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);

}
