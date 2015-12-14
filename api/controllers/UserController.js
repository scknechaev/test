var passport = require('passport');

module.exports = {

    index: function (req, res) {

        if (req.isAuthenticated()) {
            res.redirect('/dashboard');
        } else {
            res.view('admin/loginAdmin.ejs', {
                layout: false
            });
        }
    },

    login: function (req, res) {
        passport.authenticate('local', function (err, user, info) {
            if (err || !user) {
                return res.badRequest(err || {
                    'message': 'incorrect creditionals'
                });
            }

            user.email = user.email.toLocaleLowerCase();
            req.logIn(user, function (err) {
                if (err) {
                    return res.badRequest(err);
                }
                
                // res.redirect('/dashboard');
                res.ok(user);
            });

        })(req, res);
    },
    logout: function (req, res) {
        req.logOut();
        res.redirect('/');
    }
}