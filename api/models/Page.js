module.exports = {

    types: {
        isValidExp: function (url) {
            var regex = /^([\/\w\.]*)*\/?$/ ;

            return regex.test(url);
        }
    },

    attributes: {

        title: {
            type: 'string',
            required: true
        },

        navs: {
            model: 'Navigation'
        },

        url: {
            type: 'string',
            unique: true,
            required: true,
            isValidExp: true
        },

        html: {
            type: 'string',
            required: true
        },

        media: {
            type: 'array',
            defaultsTo: []
        },

        tags: {
            type: 'array'
        }

    },

    beforeUpdate: callBack,
    beforeCreate: callBack
};

function callBack(page, next) {

    if (!page.url) {
        return next('You must specify url');
    } else if ( page.url && _.isString(page.url) ) {
        page.url = page.url.trim();
    }

    Page.findOne({
        'url': page.url
    }).exec(function (err, findPage) {
        if (err || findPage) {
            return next(err || 'Page with such url already exist');
        }

        next(null, page);
    });
}
