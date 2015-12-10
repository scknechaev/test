(function () {
    'use strict';
angular.module('cmsApp')
    .factory('RESTservice', ['$http', '$q','$rootScope', function($http, $q, $rootScope){
        var Service = {
            login: function () {
                var deferred = $q.defer();
                $http.post('/login', data)
                .success(function (response, status, headers, config) {
                    console.log('user login');
                    $rootScope.user = response;
                    deferred.resolve(response, status, headers, config);
                }).error(function (response, status, headers, config) {
                    deferred.reject(response, status, headers, config);
                });

                return deferred.promise;
            },
            isLogedin: function () {
                var deferred = $q.defer();

                $http.get('/isLogedin')
                .success(function (response, status, headers, config) {
                    console.log('user login');
                    deferred.resolve(response, status, headers, config);
                }).error(function (response, status, headers, config) {
                    deferred.reject(response, status, headers, config);
                    $location.url('/login');
                });

                return deferred.promise;
            }
        }
        return Service;
    }]);
})();