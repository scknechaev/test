module.exports = function (req, res, next) {
    if (req.isAuthenticated) {
        if (req.user != undefined && (req.user.role == 2 || req.user.role == 1) ) {
            return next();
        } else {
            //return res.send(401, {message: 'user is not administrator'})
            return res.redirect('/signin');
        }
    } else {
        //return res.send(401, {message: 'login is required as administrator'})
        return res.redirect('/signin');
    }
};