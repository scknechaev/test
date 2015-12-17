module.exports = {

    attributes: {

        url: {
            type: 'string',
            unique: true,
            required: true
        },

        handler: {
            type: 'string',
            unique: true,
            required: true
        },

        type: {
            type: 'integer',
            enum: [1, 2],    // 1 - image, 2 - video
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
            var key = null; //apikey
            var fHandler = files[n].handler;
            var url = 'https://www.filepicker.io/api/file/**' + fHandler + '**?key=' + key;
            var request = require('request');

            if (key) request.del(url);
            next();
        }, cb);
    }

};
