/* ============================================================
 * File: config.js
 * Configure routing
 * ============================================================ */
(function () {
'use strict';
angular.module('publicApp')
    .config(['$stateProvider', '$urlRouterProvider','$futureStateProvider',
        function ($stateProvider, $urlRouterProvider, $futureStateProvider) {
            var futureStateResolve = function($http, $injector) {
                var RESTservice = $injector.get('RESTservice');
                var states = []
                var firstState = true;
                return RESTservice.getNavs().then(function(data) {
                    angular.forEach(data, function (value, key) {                      
                        for (var i = 0; i < states.length; i++) {
                            if(states[i].url === value.page.url){
                                return;
                            }
                        }; 
                        var state = {
                            "name": 'app.' + value.page.url,
                            "url": '/'+ value.page.url,
                            "template": '<div class="container-fluid container-fixed-lg "><h3 class="page-title">'+value.page.title+'</h3></div><div class="container-fluid container-fixed-lg">'+value.page.html+'</div>'
                        };
                        states.push(state);
                        $stateProvider.state(state);
                        if(firstState){
                            firstState = false;
                            $urlRouterProvider.otherwise('/app'+ state.url);
                        }
                    });
                });
            }
            $futureStateProvider.addResolve(futureStateResolve);
            //        DEFAULT VIEW
            // $urlRouterProvider.otherwise('/app/dashboard');

            $stateProvider
                //        PROCESS REPORTS

            .state('app', {
                abstract: true,
                url: "/app",
                templateUrl: "publicApp/tpl/app.html"
            })
            // .state('app.dashboard', {
            //     url: "/dashboard",
            //     templateUrl: "cmsAdmin/tpl/dashboard.html",
            // })
    }]);
        angular.module('publicApp').run(
          [ '$rootScope', '$state', '$stateParams', 'RESTservice',
            function ($rootScope, $state, $stateParams, RESTservice) {
                RESTservice.getNavs()
                .then(function(data) {
                    $rootScope.navs = data;
                })      
            }]
        )
})();
