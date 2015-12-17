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
			keywords: ['page', function (next, data) {
				if (!data.page) {
					return next({ 'errDesc': 'Page was not found' });
				}

				Tag.find({ 'page': data.page.id }).exec(next);
			}]
		},function (err, data) {
			if (err && err.errDesc) {
				if (err) {
					return res.badRequest(err);
				}

				return res.notFound();
			}
			console.log(data.keywords);
			res.render('./page', {
				'body'    : data.page.html,
				'title'   : data.page.title,
				'keywords': data.keywords
			});
		});
	}

};
