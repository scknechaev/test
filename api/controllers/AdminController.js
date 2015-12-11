
var fs = require('fs');
var path = require('path');
module.exports = {

    dashboard: function (req, res) {
        return res.render('indexAdmin', {
           user: req.user
       });
    }
   
};
