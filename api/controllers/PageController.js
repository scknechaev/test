module.exports = {
	render: function (req, res, next) {
		return res.view('mainBook', {
           layout: false
       });
	}
};
