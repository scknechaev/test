module.exports = {
	create: MediaService.cloudUpload,

	update: function (req, res) {
		return res.notFound();
	},

	getMedia: function (req, res) {
		var mediaId = req.param(mediaId);

		if (!mediaId) {
			return res.badRequest({ 'message': 'Media id is not defined' });
		}

		async.auto({ 
			media: function (next) {
				Media
					.findOne(mediaId)
				.exec(next);
			}, 
			pages: ['media', function (next, data) {
				if (!data.media) {
					return next({ 'message': 'Media with such id was not found' });
				}

				Page.findOne(data.media.pages).exec(next);
			}]
		}, function (err, data) {
			if (err) {
				return res.badRequest(err);
			}

			data.media.pages = data.pages;
			res.ok(data.media);
		});

	},

	getAllMedia: function (req, res) {

		async.auto({ 
			media: function (next) {
				Media.find(null).exec(next);
			}, 
			setPages: ['media', function (next, data) {
				setPagesToMedia(data.media, next);
			}]
		}, function (err, data) {
			if (err) {
				return res.badRequest(err);
			}

			res.ok(data.media);
		});
	}

};

function setPagesToMedia(media, call) {
	async.times(media.length, function (n, cb) {
		Page.find(media[n].pages).exec(function (err, pages) {
			media[n].pages = _.map(pages, function (page) {
				return _.pick(page, 'title', 'id');
			});
			cb();
		});
	}, call);
}