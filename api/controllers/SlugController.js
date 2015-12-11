var async = require('async');

module.exports = {

    render: function (req, res) {
        var pageId = req.query.pageId,
            parse  = req.query.parse;

        if (!pageId) {
            return res.badRequest('Page id is not defined');
        }

        Page
            .findOne(pageId)
            .populate('navs')
        .exec(function (err, page) {
            if (err) {
                return res.badRequest({ 'message': 'Some error', 'error': err });
            }

            if (parse) {
                res.ok('<div class="container nav-content">' + page.html + '</div>');
            } else {
                res.view('slug', { 'page': page, 'navs': page.navs, 'isParse': parse });
            }
        });

    }

};