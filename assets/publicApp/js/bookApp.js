(function () {
    'use strict';
     var app = angular.module('bookApp', [
    	'ngTable',
    	'cgBusy',
        'ngDialog', 
        'ui.router',
    	'ui.utils', 
    	'ngSanitize',
        'ngNotify', 
    	'MassAutoComplete',
        'ct.ui.router.extras'])
        app.config(['$stateProvider', '$urlRouterProvider','$futureStateProvider',
            function ($stateProvider, $urlRouterProvider, $futureStateProvider) {
                var futureStateResolve = function($http, $injector) {
                    var RESTservice = $injector.get('RESTservice');
                    var sideContent = '<div class="col-md-3 side-nav"><div class="col-sm-6 col-md-12"><div class="thumbnail text-default"><div class="overlay-container"><img src="publicApp/img/busImg.jpg"><div class="overlay-content"><h3 class="h4 headline"></h3><p></p></div><!-- /.overlay-content --></div><!-- /.overlay-container --><div class="thumbnail-meta"><p></p><p></p></div><div class="thumbnail-meta"></div><div class="thumbnail-meta"><span class="h3 heading-default"></span> <a href="#link" class="btn btn-link pull-right"></a></div></div><!-- /.thumbnail --></div><!-- /.col --><div class="col-sm-6 col-md-12"><div class="thumbnail text-default"><div class="overlay-container"><img src="publicApp/img/busImg.jpg"><div class="overlay-content"><h3 class="h4 headline"></h3><p></p></div><!-- /.overlay-content --></div><!-- /.overlay-container --><div class="thumbnail-meta"><p></p><p></p></div><div class="thumbnail-meta"></div><div class="thumbnail-meta"><span class="h3 heading-default"></span> <a href="#link" class="btn btn-link pull-right"></a></div></div><!-- /.thumbnail --></div><!-- /.col --><div class="col-sm-6 col-md-12"><div class="thumbnail text-default"><div class="overlay-container"><img src="publicApp/img/busImg.jpg"><div class="overlay-content"><h3 class="h4 headline"></h3><p></p></div><!-- /.overlay-content --></div><!-- /.overlay-container --><div class="thumbnail-meta"><p></p><p></p></div><div class="thumbnail-meta"></div><div class="thumbnail-meta"><span class="h3 heading-default"></span> <a href="#link" class="btn btn-link pull-right"></a></div></div><!-- /.thumbnail --></div><!-- /.col --><div class="col-sm-6 col-md-12"><div class="thumbnail text-default"><div class="overlay-container"><img src="publicApp/img/busImg.jpg"><div class="overlay-content"><h3 class="h4 headline"></h3><p></p></div><!-- /.overlay-content --></div><!-- /.overlay-container --><div class="thumbnail-meta"><p></p><p></p></div><div class="thumbnail-meta"></div><div class="thumbnail-meta"> <span class="h3 heading-default"></span> <a href="#link" class="btn btn-link pull-right"></a></div></div><!-- /.thumbnail --></div><!-- /.col --></div>'
                    var states = []
                    return RESTservice.getNavs().then(function(data) {
                        angular.forEach(data, function (value, key) {                      
                            for (var i = 0; i < states.length; i++) {
                                if(states[i].url === value.page.url){
                                    return;
                                }
                            }; 
                            var state = {
                                "name": value.page.url,
                                "url": '/' + value.page.url,
                                "template": '<div class="row">' + sideContent + value.page.html + '</div>'
                            };
                            states.push(state);
                            $stateProvider.state(state);
                        });
                    });
                }
                $futureStateProvider.addResolve(futureStateResolve);
                //        DEFAULT VIEW
                $urlRouterProvider.otherwise('/Home');

                $stateProvider
                    //        PROCESS REPORTS
                .state('cms', {
                    url: '/',
                    abstract: true,
                    template: '<ui-view/>'
                })
                .state('cms.home', {
                    url: 'Home',
                    templateUrl: 'publicApp/partials/bookTemplates/main.template.html'
                })
        }]);
     	app.run(
          [ '$rootScope', '$state', '$stateParams', 'RESTservice',
            function ($rootScope, $state, $stateParams, RESTservice) {
                RESTservice.getNavs()
                .then(function(data) {
                    $rootScope.navs = data;
                })      
            }]
        )
})();