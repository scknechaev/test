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
				Media.find({name: data.media}).exec(next);
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
				Media.find({name: extraMedia}).exec(next);
			}
			else {
				next();
			}
		}],
		updateNav: ['page', function (next, data) {

			async.waterfall([function (next) {
				Navigation.find(null).limit(1).exec(next);
			}, function (nav, next) {
				changeHeader(nav[0], data.page, next);
			}], next);
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
				Media.find({name: mediaToAdd}).exec(next);
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
		}],
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

function changeHeader(navigation, page, call) {
	if (!navigation) {
		return call();
	}

	setNewTitle(navigation.navs, page) ? navigation.save(call) : call(null, navigation);
}

function setNewTitle(navs, page) {
	var navsLengh = navs.length,
		nodes, currPage;

	for (var i = 0; i < navsLengh; i++) {
		currPage   = navs[i];
		nodes      = currPage.nodes.concat(currPage);
		isReplaced = checkNodes(nodes, page);

		if (isReplaced) {		// is title was replaced in current nodes
			return true;
		}
	}

	return false;
}

function checkNodes(nodes, page) {
	var nodesLength = nodes.length;

	for (var i = 0; i < nodesLength; i++) {
		if (nodes[i].id === page.id) {
			nodes[i].title = page.title;
			return true;
		}
	}
}