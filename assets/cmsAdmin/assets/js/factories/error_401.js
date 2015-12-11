(function () {
    'use strict';
    angular.module('app')
    .factory('authHttpResponseInterceptor',['$q','$window',function($q, $window){
      return {
          responseError: function(rejection) {
              if ( (rejection.status === 401)) {
                  console.log("Response Error 401", rejection);
                  // $window.location.reload();
                  $window.location.assign('/signin');
              }
              return $q.reject(rejection);
          }
      }
    }])
})();
