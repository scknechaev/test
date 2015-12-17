module.exports = {

    attributes: {

        name: {
            type: 'string',
            required: true,
        },

        href: {
            type: 'string'
        },

        navigation: {
            type: 'array',
            required: true
        }

    },

    beforeUpdate: function (navigation, cb) {
        console.log(navigation);
        if (navigation) {
            return cb(null, navigation);
        }
        console.log('Trying to create navigation');
        Navigation.create({
            'name'      : 'Navigation',
            'navigation': []
        }).exec(cb);
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
