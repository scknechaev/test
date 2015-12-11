module.exports = {

    types: {
        isValidExp: function (url) {
            var regex = /^([\/\w\.]*)*\/?$/ ;

            return regex.test(url);
        }
    },

    attributes: {

        title: {
            type: 'string'
        },

        navs: {
            model: 'Navigation'
        }

        url: {
            type: 'string',
            unique: true,
            required: true,
            isValidExp: true
        },

        html: {
            type: 'string'
        }

    },

    beforeValidate: function (values, next) {

        if (values.url !== undefined) {
            if (values.url[0] === '/') {
                values.url =  values.url.slice(1);
                next();
            } else {
                next();
            }
        }
    },

    afterDestroy: function (navs, cb) {
        Navigation.destroy( _.pluck(navs, 'id') ).exec(cb);
    }

};
