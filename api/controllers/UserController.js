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
    },

    createUser: function (req, res) {
        var params = req.body,
            email  = params.email.toLowerCase(),
            pass   = params.password;
        
        if ( !isPassLengthEnought(pass) ) {
            return res.send(400, { message: 'Min length is six simbols' });
        }

        User.create({
            'name'    : req.body.name, 
            'email'   : email, 
            'password': req.body.password, 
            'role'    : req.body.role
        }, function (err, created) {
            if (err) {
                res.send(400, {message: 'cannot create user'} );
            } else {

                return res.send({message: 'user created', user: created});
            }
        });
    },

    removeUser: function (req, res) {
        var userid = req.param('id');
        User.destroy({id: userid}).exec(function (err, deletedUser) {
            if (err) {
                res.send(400, 'cannot update user ');
            } else {
                return res.send({message: 'user deleted', user: deletedUser});
            }
        })
    },

    updateUser: function (req, res) {
        var id = req.param('id')

    }
}

function isPassLengthEnought (userPass) {
    var minPassLength = 6;

    return userPass.length >= minPassLength;
}