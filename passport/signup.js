var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var db = require('../db/init')

module.exports = function(passport){
  console.log("create signup strategy in passport/signup.js");
  passport.use('signup', new LocalStrategy({passReqToCallback : true}, function(req, username, password, done) {
    findOrCreateUser = function(){
      console.log('Check Signup credentials in passport/signup.js');
      // find a user in Mongo with provided username
      console.log(db.userdb);
      db.users.find({ 'username' : username }, function(err, user) {
        // In case of any error return
        if (err){
          console.log('Error in SignUp: '+err+' in passport/signup.js');
          return done(err);
        }
        // already exists
        if (user.length != 0) {
          console.log('User with Username = ' + username + ' already exists in passport/signup.js');
          return done(null, null);
        } else {
          // create the user
          var newUser = {username:username, password:createHash(password)};
 
          // save the user
          db.users.insert(newUser, function(err, newUser) {
            if (err){
              console.log('Error in Saving user: '+err + ' in passport/signup.js'); 
              throw err; 
            }
            console.log('Registration succesful in passport/signup.js');  
            return done(null, newUser);
          });
        }
      });
      db.users.loadDatabase(); 
    };
     
    // Delay the execution of findOrCreateUser and execute
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  }));

  // Generates hash using bCrypt
  var createHash = function(password){
    console.log('create Hash for User Password in passport/signup.js#createHash');
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
  }
}