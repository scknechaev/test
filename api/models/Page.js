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

    afterDestroy: function (pages, cb) {
        var navsIds = _.pluck(pages, 'navs'), 
            pageIds = _.pluck(pages, 'id');

        async.parallel({
            deletedNavs: function (call) {
                Navigation.destroy(navsIds).exec(call);
            },
            deletedTags: function (call) {
                Tag.destroy(pageIds).exec(call);
            }
        }, cb);
        
    }

};
