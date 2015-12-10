module.exports.navs = function (req, res) {			// not better decision but now have no time 
	var navsLength, count = 0;						// will rewrite later

	Navigation.find({}).exec(function (err, navs) {

		if (err) {
			return res.send(400, 'some error');
		}

		navsLength = navs.length;

		navs.forEach(function (nav) {

			Page.find({
				'id': nav.page
			}).exec(function (err, pages) {
				var page = pages[0];

				count++;

				if (!err && page) {
					page.html = '<div class="col-md-9 nav-content">' + page.html + '</div>';
					nav.page = page;
				}

				if (count === navsLength) {
					res.send(200, navs);
				}
			});
		});
	});
};