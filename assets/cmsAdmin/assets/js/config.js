/* ============================================================
 * File: config.js
 * Configure routing
 * ============================================================ */

angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', 'filepickerProvider',

        function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, filepickerProvider) {
            filepickerProvider.setKey('AIgCAHmhKTWikYg0yVshvz');
            $urlRouterProvider
                .otherwise('/app/dashboard');

            $stateProvider
                .state('app', {
                    abstract: true,
                    url: "/app",
                    templateUrl: "cmsAdmin/tpl/app.html"
                })
                .state('app.dashboard', {
                    url: "/dashboard",
                    templateUrl: "cmsAdmin/tpl/dashboard.html",
                    controller: 'dashboardController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                    /* 
                                        Load any ocLazyLoad module here
                                        ex: 'wysihtml5'
                                        Open config.lazyload.js for available modules
                                    */
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'cmsAdmin/assets/js/controllers/dashboardController.js'
                                    ]);
                                });
                        }]
                    }
                })
                .state('app.media', {
                    url: "/media",
                    templateUrl: "cmsAdmin/tpl/media.html",
                    controller: 'mediaController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'cmsAdmin/assets/js/controllers/mediaController.js'
                                    ]);
                                });
                        }]
                    }
                })
                .state('app.menu', {
                    url: "/menu",
                    templateUrl: "cmsAdmin/tpl/menu.html",
                    controller: 'menuController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'cmsAdmin/assets/js/controllers/menuController.js'
                                    ]);
                                });
                        }]
                    }
                })
                .state('app.users', {
                    url: "/users",
                    templateUrl: "cmsAdmin/tpl/users.html",
                    controller: 'usersController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'cmsAdmin/assets/js/controllers/usersController.js'
                                    ]);
                                });
                        }]
                    }
                })
                .state('app.editpage', {
                    url: "/editpage/:pageId",
                    templateUrl: "cmsAdmin/tpl/editpage.html",
                    controller: 'editPageController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'cmsAdmin/assets/js/controllers/editPageController.js'
                                    ]);
                                });
                        }]
                    }
                })
                .state('app.pages', {
                    url: "/pages",
                    templateUrl: "cmsAdmin/tpl/pages.html",
                    controller: 'pagesController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'cmsAdmin/assets/js/controllers/pagesController.js'
                                    ]);
                                });
                        }]
                    }
                })

        }
    ]);
