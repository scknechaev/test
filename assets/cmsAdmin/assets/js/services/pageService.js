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
        return this.request('get', '/page/' + id +'?edit=true');
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
    PageService.prototype.createPage = function (editedPage, successCall, errorCall) {
       return this.request('post', '/page', editedPage, successCall, errorCall);
    };

    /**
     * Update existing page
     */
    PageService.prototype.updatePage = function (updatedPage, successCall, errorCall) {
        return this.request('put', '/page/' + updatedPage.id, updatedPage, successCall, errorCall);
    };

    /**
     * Delete existing page
     */
    PageService.prototype.delPage = function (deletedPage, successCall, errorCall) {
        return this.request('delete', '/page/' + deletedPage.id, successCall, errorCall);
    };

    return new PageService;
}]);
