(function () {
  'use strict';

  angular.module('loginApp').config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/login', {
            templateUrl: 'cmsLogin/partials/login.html',
            controller: 'loginController'
        })
        // .when('/register', {
        //     templateUrl: 'cmsLogin/partials/register.html',
        //     controller: 'registerController'
        // })
        .otherwise({
            redirectTo: '/login'
        });
  }]);
})();