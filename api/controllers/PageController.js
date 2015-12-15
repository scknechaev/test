module.exports = {
	
	render: function (req, res) {
		return res.view('mainBook', {
           layout: false
       });
	},

	getPage: function (req, res) {
		var url = req.param('pageUrl');
		
		Page.findOne({
			'url': url
		}).exec(function (err, page) {
			if (err || !page) {

				if (!page) {
					return res.notFound();
				} 

				return res.badRequest(err); 
			}

			res.render('./page', {
				'body' : page.html,
				'title': page.title
			});

		});
	}

};
