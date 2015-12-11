module.exports = {

    attributes: {

        name: {
            type: 'string',
            required: true,
        },

        navtype: {
            type: 'integer',
            required: true
        },

        href: {
            type: 'string',
            required: true
        },

        page: {
            model: 'Page',
            required: true,
        },

        orientation: {
            type: 'integer',
            required: true,
        }

    }

};
/**
 * navtype 1 internal, 2 external
 * orientation, 1 horizontal, 2 vertical
 */
