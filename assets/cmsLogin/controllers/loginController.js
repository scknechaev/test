(function () {
    'use strict';

    angular
    	.module('loginApp')
    	.controller('loginController', ['$scope', '$http', function ($scope, $http) {
    		$scope.mail  	  = '';
    		$scope.pass  	  = '';
    		$scope.errorClass = 'invisible';

    		$scope.makeRequest = function ($event, mail, pass) {
    			$scope.errorClass = 'disabled';

    			$http.post('/login', {
    				email: mail,
					password: pass
    			}).success(function () {
    				location.assign('/admin');
    			}).error(function () {
    				$scope.errorClass = 'visible';	
    			});

    			$event.preventDefault();
    		};
   	 	}]);
})();
