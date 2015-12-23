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
	var fileName;

	async.auto({
		upload: function (cb) {
			req.file('file').upload({ 'maxBytes': 50000000 }, cb);
		},
		checkFile: ['upload', function (call, data) {
			var types      = /image|video/i,
				uploadFile = data.upload[0],
				rType;

			if ( !uploadFile || !uploadFile.type.match(types) ) {
				if (!uploadFile) { return call('Nothing uploaded'); }

				return call('Wrong mime type');
			}

			call(null, uploadFile);
		}],
		isFileExist: ['checkFile', function (call, data) {
			Media.findOne({
				'name': data.checkFile.filename
			}).exec(call);
		}],
		cloudinaryUpload: ['isFileExist', function (call, data) {
			var rType;

			if (data.isFileExist) {
				return call('File with such name already exist, please rename your file');
			}

			rType =  data.checkFile.type.match(/video/i) ? { resource_type: "video" } : {}
			cloudinary.uploader.upload(data.checkFile.fd, function(result) {
				if (result.public_id)
					call(null, result);
				else
					call(result);
			}, rType);
		}],
		save: ['cloudinaryUpload', function(call, results) {
			var mediaObj = {
				'public_id': results.cloudinaryUpload.public_id,
				'size'     : results.cloudinaryUpload.bytes,
				'type'     : results.cloudinaryUpload.resource_type,
				'url'      : results.cloudinaryUpload.url,
				'name'     : results.checkFile.filename
			};

			Media.create(mediaObj, call);
		}]
	}, function (err, results) {
		if (err) return res.badRequest(err);
		res.ok(results.save);
	});
}