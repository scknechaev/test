var bcrypt = require('bcrypt-nodejs');

module.exports = {
	'update'   	  : update,
	'generateHash': generateHash
};

/**
 * @name update
 * @desc Updating of the existing user in DB
 * @param userId - id of the user which must be updated
 * 		  params - params for a new user
 * 		  call   - callback function
 */
function update(userId, params, call) {

	async.auto({
		user: function (next) {
			User.findOne(userId).exec(next);
		},
		generatePass: ['user', function (next, data) {
			if (!data.user) {
				return next('User was not found');
			}

			if (params.password) {
				return generateHash(8, params.password, next);
			}

			next(null);			
		}],
		update: ['generatePass', function (next, data) {
			if (data.generatePass) {
				params.password = data.generatePass;
			} else {
				delete params.password;
			}

			_.extend(data.user, params);
			data.user.save(next);
		}]
	}, call);
	
}

/**
 * @name generateHash
 * @desc Generating of the hash
 * @param 
 */
function generateHash(saltLength, string, call) {

	async.auto({
		salt: function (next) {
			bcrypt.genSalt(saltLength, next);
		},
		hash: ['salt', function (next, data) {
			bcrypt.hash(string, data.salt, null, next);
		}]
	}, function (err, data) {
		call( err, (data && data.hash) );
	});
}