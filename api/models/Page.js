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
            required: true,
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
            required: true,
        },

        tags: {
            type: 'array'
        }

    },

    beforeCreate: function (page, next) {

        if (!page.url) {
            return next('You must specify url');
        } else if ( page.url && _.isString(page.url) ) {
            page.url = page.url.trim();
        }

        Page.findOne({
            'url': page.url
        }).exec(function (err, findPage) {
            if (err || findPage) {
                if (findPage) {
                    return next('Page with such url already exist');
                }

                return next(err);
            }

            next(null, page);
        });
    },

};
