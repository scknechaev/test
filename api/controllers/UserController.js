var passport = require('passport');

module.exports = {

    index: function (req, res) {
        res.view('admin/loginAdmin.ejs', {
            layout: false
        });
    },

    login: function (req, res) {

        passport.authenticate('local', function (err, user, info) {

            if ((err) || (!user)) {
                return res.send(400, {
                    message: err || 'incorrect creditionals'
                });
            }

            user.email = user.email.toLocaleLowerCase();
            req.logIn(user, function (err) {

                if (err) {
                    res.send(err);
                }

                return res.redirect('/admin');
            });

        })(req, res);
    },
    logout: function (req, res) {
        req.logOut();
        res.redirect('/signin');
    }
}