module.exports = {

    types: {
        isValidExp: function (url) {
            var regex = /^([\/\w\.\-]*)*\/?$/ ;

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

    beforeUpdate: function (page, next) {

        if (!page.url) {
            return next('You must specify url');
        }

        checkURL({
            'id' : {
                '!': page.id
            },
            'url': page.url
        }, page, next);
    },

    beforeCreate: function (page, next) {

        if (!page.url) {
            return next('You must specify url');
        } else if ( page.url && _.isString(page.url) ) {
            page.url = page.url.trim();
        }

        checkURL({ 'url': page.url }, page, next);
    }
};

function checkURL(query, page, call) {
    Page.findOne(query).exec(function (err, findPage) {
        if (err || findPage) {
            return call(err || 'Page with such url already exist');
        }

        call(null, page);
    });
}
