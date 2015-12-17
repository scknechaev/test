angular.module('app').factory('navigationService', [
    '$http',
    'baseService', 
    function ($http, baseService) {
        
        /**
         * Conctructor, for creating of service used in for navigation controller
         */
        function NavigationService () {

        }

        NavigationService.prototype = Object.create(baseService);

        /**
         * Getting one navigation
         */
        NavigationService.prototype.getNav = function (id) {
            return this.request('get', '/navigation/' + id);
        };

        /**
         * Getting all navigations
         */
        NavigationService.prototype.getNavs = function () {
            return this.request('get', '/navigation');
        };

        /**
         * Delete current navigation
         */
        NavigationService.prototype.delNav = function (nav) {
            return this.request('delete', '/navigation/' + nav.id);
        };

        /**
         * Create new navigation
         */
        NavigationService.prototype.createNav = function (nav) {
            return this.request('post', '/navigation', nav);
        };

        /**
         * Edit current navigation
         */
        NavigationService.prototype.editNav = function (nav) {
            return this.request('put', '/navigation', nav);
        };

        return new NavigationService;
}]);
