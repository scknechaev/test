module.exports = {
	'getAllNavs': getAllNavs
};

/**
 * @name getAllNavs
 * @desc Getting of all navigations from DB
 * @param call - callback function
 */
function getAllNavs(call) {
	Navigation
		.find(null)
	.exec(call);
}