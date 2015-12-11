var bcrypt = require('bcrypt-nodejs');

module.exports = {

    dashboard: function (req, res) {
        return res.render('indexAdmin', {
           user: req.user
       });

    },

    createUser: function (req, res) {
        var params = _.pick(req.body, ['name', 'email', 'password', 'role']),
            email  = params.email && params.email.toLowerCase();

        if ( !CommonUtils.isPassLengthEnought(params.password) ) {
            return res.badRequest({ 'message': 'Min length is six simbols' });
        }

        async.auto({
        	salt: function (call) {
        		call(null, bcrypt.genSaltSync(8));
        	},
        	hash: ['salt', function (call, data) {
        		bcrypt.hash(params.password, data.salt, null, call);
        	}],
        	user: ['hash', function (call, data) {
        		params.password = data.hash;

        		User.create(params).exec(call);
        	}]
        }, function (err, data) {
            if (err) {
                res.badRequest({ 'message': 'Cannot create user', 'error': err });
            } 
            
            res.ok({ 'message': 'User created', 'user': _.omit(data.user, 'password') });
        });
    },

    deleteUser: function (req, res) {
        var userId = req.body.userId;

        if (!userId) {
        	return res.badRequest({ 'message': 'User id is not defined' });
        }

        User.destroy(userId).exec(function (err, deletedUser) {
            if (err || !deletedUser.length) {
                res.badRequest({ 
                	'message': 'Cannot delete user', 
                	'error'  : err || 'Cannot find user with id - ' + userId
                });
            } 
            
        	res.ok({ 'message': 'User was deleted', 'user': deletedUser });
        });

    },

    updateUser: function (req, res) {
        var userId = req.body.userId,
        	params = _.pick(req.body, ['name', 'email', 'password', 'role']);

        if (!userId) {
        	return res.badRequest({ 'message': 'User id is not defined' });
        }

        User.update(userId, params).exec(function (err, updatedUser) {
        	if (err || !updatedUser.length) {
                res.badRequest({ 
                	'message': 'Cannot update user', 
                	'error'  : err || 'Cannot find user with id - ' + userId
                });
            } 
            
        	res.ok({ 'message': 'User was updated', 'user': updatedUser });
        });

    }
   
};
