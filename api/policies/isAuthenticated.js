
module.exports = function (req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    } else if (req.wantsJSON) {
    	return res.forbidden('You must be authenticated as user');
    }

    res.redirect('/');
};
