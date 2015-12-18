module.exports = {
	
	render: function (req, res) {
		return res.view('mainBook', {
           layout: false
       });
	},

	getPage: function (req, res) {
		var url = req.param('pageUrl');

		async.auto({
			page: function (next) {
				Page.findOne({ 'url': url }).exec(next);
			},
			navigation: ['page', function (next, data) {
				if (!data.page) {
					return next({ 'errDesc': 'Page was not found' });
				}

				Navigation.find()
				.sort({ 'createdAt': 0 })
				.exec(next);
			}]
		},function (err, data) {
			if (err &&  err.errDesc && !req.wantsJSON) {
				return res.notFound();
			} else if (err) {
				return res.badRequest(err);
			}

			res.render('./page', {
				'body'      : data.page.html,
				'title'     : data.page.title,
				'keywords'  : data.page.tags,
				'navigation': data.navigation.shift()
			});
		});
	}

};
