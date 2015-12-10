module.exports = {
	getNavs: function (req, res) {
		require('./../common_modules/navigations').navs(req, res);
	}
};
