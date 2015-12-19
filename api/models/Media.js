var cloudinary = require('cloudinary');

module.exports = {

    attributes: {

        url: {
            type: 'string',
            unique: true,
            required: true
        },

        public_id: {
            type: 'string',
            unique: true,
            required: true
        },

        type: {
            type: 'string',
            required: true
        }

    },

    beforeCreate: function (file, next) {
        if ( file.url && _.isString(file.url) ) {
            file.url = file.url.trim();
        }

        next(null, file);
    },

    afterDestroy: function (files, cb) {
        async.times(files.length, function (n, next) {
            cloudinary.uploader.destroy(files[n].public_id, function(result) { next();});
        }, cb);
    }

};
