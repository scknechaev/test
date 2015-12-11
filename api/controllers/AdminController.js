
var fs = require('fs');
var path = require('path');
module.exports = {

    myprotected: function (req, res) {
        return res.render('indexCms', {
           user: req.user
       });
    }
};
