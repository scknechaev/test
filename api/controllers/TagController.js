module.exports = {
	_config: {
	    'actions'  : true,
	    'shortcuts': false,
	    'rest'     : false
	},

	create: function (req, res) {
		var tags   = req.body.tags,
			pageId = req.body.pageId;

		if (!pageId || !tags) {
			if (!pageId) {
				return res.badRequest('You must specifi pageId');
			}

			return res.badRequest('You must specified tags');
		}

		async.auto({
			page: function (next) {
				Page.findOne(pageId).exec(next);
			},
			tags: ['page', function (next, data) {
				if (!data.page) {
					return next('Specified page is does not exist');
				}

				tags = CommonUtils.generateTags(tags.split(','), pageId);
				Tag.create(tags).exec(next);
			}]
		}, function (err, data) {
			if (err) {
				return res.badRequest(err);
			}

			res.ok(data.tags);
		});
		
	}
};