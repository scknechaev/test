(function () {
    'use strict';

    angular.module('cmsApp').controller('loginController', ['$scope', '$location', 'RESTservice' , function ($scope, $location, RESTservice) {
    	$scope.data = {};
    	console.log('!!!!!!!!!!!!!!!!!');
        $scope.login = function () {
            console.log('login initi')
            RESTservice.login(data).then(function (response) {
                $location.url('/admin');
            },function(response){
            	console.log('ERRor');
            })
        }
    }])
})();
