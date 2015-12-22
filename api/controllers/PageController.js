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
		var identifier = req.param('identifier'),
			isNeedEdit = req.query.edit;

		async.auto({
			page: function (next) {
				Page.findOne({
					or: [
						{ 'url': identifier },
						{ 'id' : identifier }
					]
				}).exec(next);
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

			if (!isNeedEdit) {
				CommonUtils.renderBBTags(data.page);
			}

			if (req.wantsJSON) {
				res.ok(data.page);
			} else {
				res.render('./page', {
					'body'      : data.page.html,
					'title'     : data.page.title,
					'keywords'  : data.page.tags,
					'navigation': data.navigation.shift()
				});
			}

		});
	},

	pages: function (req, res) {

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
