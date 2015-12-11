module.exports = function (req, res, next) {

    if (req.isAuthenticated() && isAdmin(req.user)) {
    	next();
    } 

    return res.send(401, { message: 'Have no permissions to do this action' });
};

/**
 * @name isAdmin
 * @desc Checking is user who want to call remote procedure is administrator
 * @param user - user who make call
 */
function isAdmin(user) {
	return user.role === 1;
}

