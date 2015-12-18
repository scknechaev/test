module.exports = {
	'removeEmpty'		 : removeEmpty,
	'isPassLengthEnought': isPassLengthEnought,
	'generateTags'		 : generateTags
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
 * @name generateTags
 * @desc Generating of the tags for creating in DB
 * @param tags   - tags array
 * 		  pageId - id of the page to which this tag must be binded 
 */
function generateTags (tags, pageId) {
	return _.map(tags, function (tag) {
		return {
			'tag' : tag,
			'page': pageId
		};
	});
}