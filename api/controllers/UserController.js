var passport = require('passport');

module.exports = {

    index: function (req, res) {
        res.view('admin/loginAdmin.ejs', {
            layout: false
        });
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
                    res.badRequest(err);
                }

                return res.redirect('/dashboard');
            });

        })(req, res);
    },
    logout: function (req, res) {
        req.logOut();
        res.redirect('/');
    }
}