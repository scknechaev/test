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
        if ( page.url && _.isString(page.url) ) {
            page.url = page.url.trim();
        }

        next(null, page);
    },

};
