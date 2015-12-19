var passport = require('passport');

module.exports = {

    index: function (req, res) {
        res.render('./publicIndex');
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

                res.ok(user);
            });

        })(req, res);
    },

    cmsSignIn: function (req, res) {
        if (req.isAuthenticated()) {
            return res.redirect('/cms');
        }

        res.view('admin/loginAdmin.ejs', {
            layout: false
        });
    },

    logout: function (req, res) {
        req.logOut();
        res.redirect('/');
    },

    getUsersList: function (req, res) {
        User.find(null).exec(function (err, users) {
            if (err) {
                return res.badRequest(err);
            }

            res.ok(users);
        });
    },

    getCurrUser: function (req, res) {
        res.ok({ 'user': req.user });
    }
}