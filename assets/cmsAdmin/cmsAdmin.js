
var adminApp =  angular.module('adminApp', ['ngRoute', 'ngCkeditor', 'ui.bootstrap', 'ngNotify','ngDialog']);

(function (adminApp) {
    var userRole = $('[data-user-role]').data('user-role');

    adminApp
        .config(['$httpProvider',function($httpProvider) {
            //Http Intercpetor to check auth failures for xhr requests
            $httpProvider.interceptors.push('authHttpResponseInterceptor');
        }])
        .run(['$rootScope', '$location', function ($rootScope, $location) {
            
            if (userRole && userRole === 1) {
                $rootScope.userRole = 0;        // moderator
            } else {
                $rootScope.userRole = 1;        // admin
            }
            $rootScope.isActive = function(route) {
                return $location.path().indexOf(route) !== -1;
            }
        }]);

    if (userRole === 1) {       // for moderator
        adminApp
            .config([
                '$routeProvider',
                '$httpProvider',
                function ($routeProvider, $httpProvider) {
                    $httpProvider.interceptors.push('httpInterceptor');

                    $routeProvider.when('/pages', {
                        templateUrl: '/cmsAdmin/adminPartials/pages.html',
                        controller: 'pagesController'
                    }).when('/editpage', {
                        templateUrl: '/cmsAdmin/adminPartials/editpage.html',
                        controller: 'editPageController'
                    }).otherwise({
                        // redirectTo: '/users'
                        redirectTo: '/pages'
                    });
                }
            ]);
    } else {
        adminApp                // for admin
            .config([
                '$routeProvider',
                '$httpProvider',
                function ($routeProvider, $httpProvider) {
                    $httpProvider.interceptors.push('httpInterceptor');

                    $routeProvider.when('/pages', {
                        templateUrl: '/cmsAdmin/adminPartials/pages.html',
                        controller: 'pagesController'
                    }).when('/editpage', {
                        templateUrl: '/cmsAdmin/adminPartials/editpage.html',
                        controller: 'editPageController'
                    }).when('/users', {
                        templateUrl: '/cmsAdmin/adminPartials/users.html',
                        controller: 'usersController'
                    }).when('/navigation', {
                        templateUrl: '/cmsAdmin/adminPartials/navigation.html',
                        controller: 'navigationController'
                    }).when('/dashboard', {
                        templateUrl: '/cmsAdmin/adminPartials/dashboard.html',
                        controller: 'dashboardController'
                    }).when('/media', {
                        templateUrl: '/cmsAdmin/adminPartials/media.html',
                        controller: 'mediaController'
                    }).otherwise({
                        redirectTo: '/users'
                    });
                }
            ]);
    }
})(adminApp);

