var bcrypt = require('bcrypt-nodejs');

module.exports = {

    _config: {
        'actions'  : false,
        'shortcuts': false,
        'rest'     : false
    },

    dashboard: function (req, res) {
      	res.render('indexCms', {
        	user: req.user
        });
    },

    createUser: function (req, res) {
        var params 			  = _.pick(req.body, ['name', 'email', 'password', 'role']),
            email  			  = params.email && params.email.toLowerCase(),
            passLengthEnought = CommonUtils.isPassLengthEnought(params.password);

        if ( !email || !passLengthEnought ) {
        	if (!email) {
        		return res.badRequest({ 'message': 'Email is not specified' });
        	}

            return res.badRequest({ 'message': 'Min length is six simbols' });
        }

        async.auto({
        	isUserExist: function (call) {
        		User.findOne({
        			'email': email
        		}).exec(call);
        	},
        	hash: ['isUserExist', function (call, data) {
                if (data.isUserExist) {
                    return call('User with such email already exist');
                }

        		AdminService.generateHash(8, params.password, call);
        	}],
        	user: ['hash', function (call, data) {
        		params.password = data.hash;

        		User.create(params).exec(call);
        	}]
        }, function (err, data) {
            if (err) {
                return res.badRequest({ 'message': 'Cannot create user', 'error': err });
            } 
            
            res.ok({ 'message': 'User created', 'user': _.omit(data.user, 'password') });
        });
    },

    deleteUser: function (req, res) {
        var userId = req.param('userId');

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
        var userId = req.param('userId'),
        	params = _.pick(req.body, ['name', 'email', 'password', 'role']);

        if (!userId) {
        	return res.badRequest({ 'message': 'User id is not defined' });
        }

        AdminService.update(userId, params, function (err, data) {
            if (err) {
                return res.badRequest({ 
                    'message': 'Cannot update user', 
                    'error'  : err || 'Cannot find user with id - ' + userId
                });
            } 
            
            res.ok({ 'message': 'User was updated', 'user': data.user });
        });

    }
   
};
