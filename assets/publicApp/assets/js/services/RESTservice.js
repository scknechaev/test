(function () {
    'use strict';

    angular.module('publicApp')
    .factory('RESTservice', ['$http', '$q', function($http, $q){
        var Service = {
            getNavs: function () {
                var deferred = $q.defer();

                $http.get('/navigation')
                .success(function (response, status, headers, config) {

                    deferred.resolve(response, status, headers, config);
                }).error(function (response, status, headers, config) {
                    deferred.reject(response, status, headers, config);
                });

                return deferred.promise;
            }
        }


        return Service;
    }]);
})();