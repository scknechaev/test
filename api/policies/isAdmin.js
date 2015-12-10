module.exports = function (req, res, next) {

    if (req.isAuthenticated) {
    	console.log(res.user);
        if (req.user != undefined && (req.user.role === 2 || req.user.role === 1) ) {
            return next();
        }
    } 

    return res.send(401, {message: 'login is required as administrator or moderator'});
};

