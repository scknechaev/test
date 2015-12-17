module.exports = {
	create: MediaService.cloudUpload,

	update: function (req, res) {
		return res.notFound();
	}
};