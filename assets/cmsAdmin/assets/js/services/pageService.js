angular.module('app').factory('pageService', ['$http', 'baseService', function ($http, baseService) {

    /**
     * Conctructor, for creating of service used in page controller
     */
    function PageService () {

    }

    PageService.prototype = Object.create(baseService);

    /**
     * Get one page from server
     */
    PageService.prototype.getOnePage = function (id) {
        return this.request('get', '/page?id=' + id);
    };

    /**
     * Get list of all pages from server
     */
    PageService.prototype.getPages = function () {
        return this.request('get', '/page');
    };

    /**
     * Creating new page
     */
    PageService.prototype.createPage = function (editedPage) {
       return this.request('post', '/page', editedPage);
        // return $http.post('/page', editedPage).then(function (data) {
            // return data.data;
        // });
    };

    /**
     * Update existing page
     */
    PageService.prototype.updatePage = function (updatedPage) {
        return this.request('put', '/page/' + updatedPage.id, updatedPage);
        // return $http.put('/page/' + updatedPage.id, updatedPage).then(function (data) {
            // return data.data;
        // });
    };

    /**
     * Delete existing page
     */
    PageService.prototype.delPage = function (deletedPage) {
        return this.request('delete', '/page/' + deletedPage.id);
    };

    return new PageService;
}]);
