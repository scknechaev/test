var async = require('async');

module.exports = {

    render: function (req, res) {
        var pageId = req.query.pageId,
            parse  = req.allParams().parse || req.query.parse;

        if (!pageId) {
            return res.badRequest('page id is not defined');
        }

        async.parallel({
            ptask: function (callback) {
                Page.findOne(pageId).exec(function (err, data) {

                    if (err) {
                        callback(err, null);
                    } else if (data) {
                        callback(null, data);
                    } else {
                        Page.findOne({
                            url: req.param('pageID')
                        }).exec(function (err, data) {
                            if (err) {

                            } else if (data) {
                                callback(null, data);

                            } else {
                                callback(new Error('page not found'), null);

                            }
                        })
                    }
                });
            },
            ntask: function (callback) {
                Navigation.find().exec(function (err, navs) {
                 if (err) {
                     callback(err, null);
                 } else if (navs) {
                     callback(null, navs)
                 }
             });
            }
        }, function (err, result) {
            if (err) {
                res.send(err)
            } else if (result) {
                var navs = result.ntask;
                var page = result.ptask;
                
                if (parse) {
                    return res.send(200, '<div class="container nav-content">' + page.html + '</div>');
                } else {
                    return res.view('slug', {page: page, navs: navs, isParse: parse});
                    // return res.view('slug', {page: page});
                }
            }
        });

    }

};