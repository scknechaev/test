module.exports = {
	
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
	}

};
