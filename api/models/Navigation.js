module.exports = {

    attributes: {

        autoCreatedAt: true,
        autoUpdatedAt: true,

        name: {
            type: 'string',
            required: true,
        },

        href: {
            type: 'string'
        },

        navigation: {
            type: 'string',
            required: true
        }

    },

    beforeUpdate: function (navigation, cb) {
        
        Navigation
            .find()
            .limit(1)
        .exec(function (err, nav) {
            console.log(nav);
            if (err || !nav.length) {
                if (err) {
                    return cb(err);
                }
                console.log('Trying to create new nav');
                return Navigation.create(navigation).exec(cb);
            }

            cb(null, navigation);
        });

    }

    // beforeCreate: function (navigation, cb) {
    //     if (navigation.navtype == 1) {
    //         return Page.findOne(navigation.page).exec(function (err, page) {
    //             if (err || !page) {
    //                 return cb(err || 'Page with such id is not exist');
    //             }

    //             cb(null, navigation);
    //         });
    //     } else if (!navigation.href) {
    //         return cb('External link is not specified');
    //     }

    //     cb(null, navigation);
    // }

};
/**
 * navtype 1 internal, 2 external
 * orientation, 1 horizontal, 2 vertical
 */
