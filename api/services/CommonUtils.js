var BBTagRegExp   = new RegExp(/\[.*\]/ig),
	templates     = {
		'image': _.template('<img src="<%= src %>" title="<%= name %>" alt=""/>'),
		'video': _.template('<video controls="true" src="<%= name %>"></video>')
	};

module.exports = {
	'removeEmpty'		 : removeEmpty,
	'renderBBTags'		 : renderBBTags,
	'isPassLengthEnought': isPassLengthEnought,
};

/**
 * @name removeEmpty
 * @desc Removing from object all values that are undefined or empty string
 * @param obj - object from which need to remove all not valid values
 */
function removeEmpty(obj) {
	return _.omit(obj, function (val) {
		return _.isUndefined(val) || _.isNaN(val) || ( _.isString(val) && _.isEmpty(val.trim()) ); 
	});
}

/**
 * @name isPassLengthEnought
 * @desc Checking is length of the password
 * @param userPass - password
 */
function isPassLengthEnought (password) {
    var minPassLength = 6;

    return password.length >= minPassLength;
}

/**
 * @name renderBBTags
 * @desc Render of the BBTags in html of the page
 * @param page - html for page from DB
 */
function renderBBTags(page, call) {
	var html      = page.html,
		mediaArr  = _.map(BBTagRegExp.exec(html), function (mediaName) { 
			return mediaName.slice(1, mediaName.length - 1);
		}),
		searchObj = generateSearch(mediaArr);

	Media.find(searchObj.query).exec(function (err, mediaFiles) {
		if (err) { return call(err); }

		mediaFiles.forEach(function (media) {
			var fileName = media.name,
				regExp, template;

			if (searchObj.media[fileName]) {
				regExp   = new RegExp('\\[' + fileName + '\\]', 'gi');
				template = templates[media.type]({
					'src' : media.url,
					'name': media.name
				});

				html = html.replace(regExp, template);
			}
		});
		page.html = html;

		call();
	});
}

/**
 * @name generateSearch
 * @desc Getting extension of the file
 * @param file - file from which will need to take extension
 */
function generateSearch(mediaArr) {
	var mediaObj = {},
		query    = {
			name: []
		};

	_.map(mediaArr, function (file) {
		query.name.push(file);

		mediaObj[file] =  {
			'fileName' : file
		};
	});

	return {
		'media': mediaObj,
		'query': query
	};
}