module.exports = {
	'cloudUpload': cloudUpload
};

var cloudinary = require('cloudinary');
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
				{maxBytes: 10000000},
				function (err, uploaded) {
					if (err) return cb(err);
					if (uploaded && uploaded[0]) {
						if (uploaded[0].type.indexOf('image') < 0) return cb('Only images allowed');

						cloudinary.uploader.upload(uploaded[0].fd, function(result) {
							cb(null, result);
						});
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
		if (err) return res.serverError(err);
		res.ok(results.save);
	});
}