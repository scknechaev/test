module.exports = {
	_config: {
	    'actions'  : false,
	    'shortcuts': false,
	    'rest'     : false
	},
	
	getNavs: function (req, res) {
		NavigationService.getAllNavs(function (err, navs) {
			if (err) {
				return res.serverError({
					'message': 'error while requesting navigations',
					'error'  : err
				});
			}

			res.ok(navs);
		});
	},

	update: function (req, res) {
		var params = _.pick(req.body, ['navs']);

		Navigation.update(null, params).exec(function (err, navigations) {
			if (err || !navigations.length) {
				return res.badRequest(err || 'Navigation with such id was not found');
			}

			res.ok(navigations);
		});
	}

};
