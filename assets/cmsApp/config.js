(function () {
  'use strict';
  angular.module('cmsApp').config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/', {
          templateUrl: 'js/cmsApp/index.html'
      }) .when('/login', {
          templateUrl: 'js/cmsApp/partials/Account/Login.html',
          controller: 'loginController'
      }).when('/register', {
          templateUrl: 'js/cmsApp/partials/Account/Register.html'
      }).when('/admin', {
          templateUrl: 'js/cmsApp/partials/adminhome.html',
      }).otherwise({
          redirectTo: '/'
      })
  }]);
})();