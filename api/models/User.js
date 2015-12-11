/**
 * Created by Ayerhan on 4/15/2015.
 */
module.exports = {
    attributes: {
        
        name: {
            type: 'string'
        },

        email: {
            type: 'string'
        },

        password: {
            type: 'string'
        },

        role: {
            type: 'integer',
            enum: [1, 2]    // 1 - admin, 2 - author
        }
    }
};
