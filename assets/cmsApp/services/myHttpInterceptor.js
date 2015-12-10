/**
 * Created by Ayerhan on 4/23/2015.
 */
(function () {
    'use strict';

    angular.module('cmsApp')
    .factory('myHttpInterceptor', ['$rootScope', '$http', '$location', function ($rootScope, $http, $location) {

        return {
            // optional method
            /*        'request': function(config) {
                      // do something on success
                      return config;
                    },

                    // optional method
                    'requestError': function(rejection) {
                      // do something on error
                      if (canRecover(rejection)) {
                        return responseOrNewPromise
                      }
                      return $q.reject(rejection);
                    },



                    // optional method
                    'response': function(response) {
                      // do something on success
                      return response;
                    },*/
                    
            // optional method
            'responseError': function (response) {
                // do something on error
                if (response.status = 401) {
                    $location.url('/login');
                }

                return $q.reject(rejection);
            }
        };

    }])

})();
