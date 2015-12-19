var cloudinary = require('cloudinary');

module.exports = {
	'cloudUpload': cloudUpload
};

/**
 * @name cloudUpload
 * @desc Upload file to cloudinary
 * @param req - request
 * @param res - response
 */
function cloudUpload(req, res) {
	async.auto({
		upload: function (cb) {
			req.file('file').upload(
				{ 'maxBytes': 50000000 },
				function (err, uploaded) {
					if (err) return cb(err);
					if (uploaded && uploaded[0]) {
						var types = /image|video/i;
						if (!uploaded[0].type.match(types)) return cb('Wrong mime type');

						var rType = (uploaded[0].type.match(/video/i)) ? { resource_type: "video" } : {};

						cloudinary.uploader.upload(uploaded[0].fd, function(result) {
							if (result.public_id)
								cb(null, result);
							else
								cb(result);
						}, rType);
					}
					else {
						cb('Nothing uploaded');
					}
				}
			);
		},
		save: ['upload', function(cb, results) {
			var mediaObj = {
				public_id: results.upload.public_id,
				size: results.upload.bytes,
				type: results.upload.resource_type,
				url: results.upload.url
			};

			Media.create(mediaObj, cb);
		}]
	}, function (err, results) {
		if (err) return res.badRequest(err);
		res.ok(results.save);
	});
}