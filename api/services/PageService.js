var cloudinary = require('cloudinary');

module.exports = {
	'createPage': createPage,
	'updatePage': updatePage,
	'removePage': removePage,
	'sendPage'  : sendPage
};

function createPage (data, callback) {
	async.auto({
		page: function (next) {
			Page.create(data).exec(next);
		},
		getMedia: function (next) {
			if (data.media && data.media.length) {
				Media.find({id: data.media}).exec(next);
			}
			else {
				next();
			}
		},
		saveMedia: ['page', 'getMedia', function (next, results) {
			if (results.getMedia && results.getMedia.length) {
				var id = results.page._id || results.page.id;

				async.times(results.getMedia.length,
					function (n, cb) {
						results.getMedia[n].pages.push(id);
						results.getMedia[n].save(cb);
					},
					next
				);
			}
			else {
				next();
			}
		}]
	}, callback);
}

function updatePage (id, data, callback) {
	var oldMedia, newMedia = data.media;

	async.auto({
		page: function (next) {
			Page.findOne({id: id})
				.exec(function (err, result) {
					if (err) return next(err);

					oldMedia = result.media;

					_.each(data, function (val, key) {
						result[key] = val;
					});

					result.save(next);
				});
		},
		getMediaToRemove: ['page', function (next) {
			var extraMedia = _.difference(oldMedia, newMedia);
			if (extraMedia.length) {
				Media.find({id: extraMedia}).exec(next);
			}
			else {
				next();
			}
		}],
		removeMedia: ['getMediaToRemove', function (next, results) {
			if (results.getMediaToRemove && results.getMediaToRemove.length) {
				async.times(results.getMediaToRemove.length,
					function (n, cb) {
						results.getMediaToRemove[n].pages = _.without(results.getMediaToRemove[n].pages, id);
						results.getMediaToRemove[n].save(cb);
					},
					next
				);
			}
			else {
				next();
			}
		}],
		getMediaToAdd: ['page', function (next) {
			var mediaToAdd = _.difference(newMedia, oldMedia);

			if (mediaToAdd.length) {
				Media.find({id: mediaToAdd}).exec(next);
			}
			else {
				next();
			}
		}],
		addMedia: ['getMediaToAdd', function (next, results) {
			if (results.getMediaToAdd && results.getMediaToAdd.length) {
				async.times(results.getMediaToAdd.length,
					function (n, cb) {
						results.getMediaToAdd[n].pages = _.union(results.getMediaToAdd[n].pages, [id]);
						results.getMediaToAdd[n].save(cb);
					},
					next
				);
			}
			else {
				next();
			}
		}]
	}, callback);
}

function removePage (id, callback) {
	async.auto({
		page: function (next) {
			Page.destroy({id: id}).exec(next);
		},
		getMediaToRemove: function (next) {
			Media.find({pages: id}).exec(next);
		},
		removeMedia: ['getMediaToRemove', function (next, results) {
			if (results.getMediaToRemove && results.getMediaToRemove.length) {
				async.times(results.getMediaToRemove.length,
					function (n, cb) {
						results.getMediaToRemove[n].pages = _.without(results.getMediaToRemove[n].pages, id);
						results.getMediaToRemove[n].save(cb);
					},
					next
				);
			}
			else {
				next();
			}
		}]
	}, callback);
}

function sendPage(isNeedJSON, navigation, page, res) {
	if (isNeedJSON) {
		res.ok(page);
	} else {
		res.render('./page', {
			'body'      : page.html,
			'title'     : page.title,
			'keywords'  : page.tags,
			'navigation': navigation.shift()
		});
	}
}