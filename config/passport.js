
var passport       = require('passport'),
    emailValidator = require('email-validator'),
    bcrypt         = require('bcrypt-nodejs'),
    LocalStrategy  = require('passport-local').Strategy;


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (userId, done) {
  User.findOne(userId, done);
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },  function (email, password, next){
    var query = {};

    if (emailValidator.validate(email)) {
        query.email = email;
    } else {
        query.username = email;
    }

    async.auto({
      user: function (call) {
        User.findOne(query).exec(call);
      },
      isPassCorrect: ['user', function (call, data) {
        if (!data.user) {
          return call({ 'message': "incorrect email" });
        }

        bcrypt.compare(password, data.user.password, call);
      }],
      checkPasswords: ['isPassCorrect', function (call, data) {
        if (!data.isPassCorrect) {
          return call({ 'message': 'Invalid password' });
        }

        call(null);
      }]
    }, function (err, data) {
      generResponse(err, data, next);
    });

  }));

/**
 * @name generResponse
 * @desc Generating of the response for authorization
 * @param err  - error object
 *        data - data object from async
 *        call - callback function
 */
function generResponse (err, data, call) {
  if (err) {
    return call(null, false, err);
  }

  call(null, {
      'email': data.user.email,
      'id'   : data.user.id
    }, {
      'message': 'Logged in Successfully'
  });
}
