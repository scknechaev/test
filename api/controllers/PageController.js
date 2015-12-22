module.exports = {

	create: function (req, res) {
		PageService.createPage(req.body, function (err, result) {
			if (err && err.errDesc && !req.wantsJSON) {
				return res.notFound();
			} else if (err) {
				return res.badRequest(err);
			}

			res.ok(result.page);
		});
	},

	update: function (req, res) {
		PageService.updatePage(req.params.id, req.body, function (err, result) {
			if (err) return res.badRequest(err);

			res.ok(result.page);
		});
	},

	destroy: function (req, res) {
		PageService.removePage(req.params.id, function (err, result) {
			if (err) return res.badRequest(err);

			res.ok(result.page);
		});
	},
	
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
	},

	pages: function (req, res) {

		// console.log('Trying to find pages');

		// async.auto({
		// 	collection: function (next) {
		// 		Page.native(next);
		// 	},
		// 	pages: ['collection', function (data, next) {
		// 		data.collection.find(null, {
		// 			'html' : 0,
		// 			'title': 1,
		// 			'navs' : 1,
		// 			'url'  : 1,
		// 			'tags' : 1
		// 		}).toArray(next);
		// 	}]
		// }, function (err, data) {
		// 	if (err) {
		// 		return res.badRequest(err);
		// 	}

		// 	res.ok(data.pages);
		// });
		Page.find(null).exec(function (err, pages) {
			if (err) {
				return res.badRequest(err);
			}

			res.ok( _.map(pages, function (page) { 
				delete page.html; 
				return page; 
			}) );
		});
	}

};
