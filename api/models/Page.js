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
            'url': url
        }).exec(function (err, page) {
            if (err || page) {
                if (page) {
                    return next('Page with such url already exist');
                }

                return next(err);
            }

            next(null);
        });
    },

};
