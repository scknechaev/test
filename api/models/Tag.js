module.exports = {

    attributes: {
        
        tag: {
            type: 'string',
            required: true
        },

        page: {
            model: 'Page',
            required: true
        }
        
    }

};
