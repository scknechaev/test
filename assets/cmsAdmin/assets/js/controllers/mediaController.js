angular.module('app')
	.controller('mediaController', ['$scope', '$modal',
 	function ($scope, $modal) {
    $scope.showMediaItem = function(item) {
    	$modal.open({
    	    resolve:{
    	      item: function(){
    	        return item;
    	      }
    	    },
    	    templateUrl: 'cmsAdmin/tpl/modals/showMediaItem.html.tmpl',
    	    controller: ['$scope', '$modalInstance', 'item',
    	      function($scope, $modalInstance, item) {
    	        $scope.item = item;
    	        $scope.cancel = function () {
    	            $modalInstance.dismiss('cancel');
    	        };
    	    }]
    	});
    }
}]);