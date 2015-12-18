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
        }

    },

    beforeCreate: function (page, next) {
        if ( page.url && _.isString(page.url) ) {
            page.url = page.url.trim();
        }

        next(null, page);
    },

    // beforeValidate: function (values, next) {

    //     if (values.url !== undefined) {
    //         if (values.url[0] === '/') {
    //             values.url =  values.url.slice(1);
    //             next();
    //         } else {
    //             next();
    //         }
    //     }
    // },

    afterDestroy: function (pages, cb) {
        Tag.destroy(_.pluck(pages, 'id')).exec(cb);
    }

};
