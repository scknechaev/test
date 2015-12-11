
var passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findOne({ 'id': id } , function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done){
    User.findOne({email:email}, function(err, user){
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, { 'message': "incorrect email" }); // refactor this to show just an error in login
      }

      if(password === user.password){
        done(null, {
          'email': user.email,
          'id'   : user.id
          }, {
            message: 'Logged in Successfully'
          });

      }
      else{
        return done(null, false, {
          message:'Invalid password' // refactor this so that to show just an error in login
        });
      }
    })
  }
));
