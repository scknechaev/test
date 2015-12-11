/**
 * Created by Ayerhan on 4/15/2015.
 */
module.exports = {

    attributes: {
        
        name: {
            type: 'string',
            required: true
        },

        email: {
            type: 'string',
            required: true
        },

        password: {
            type: 'string',
            required: true
        },

        role: {
            type: 'integer',
            enum: [1, 2],    // 1 - admin, 2 - author
            defaultsTo: 2
        }
        
    }

};
