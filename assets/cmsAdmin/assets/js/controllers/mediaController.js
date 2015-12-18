angular.module('app')
	.controller('mediaController', ['$scope', '$modal', '$http', '$sce',
 	function ($scope, $modal, $http, $sce) {
    $scope.mediaArr = [];
    function getMedia() {
        $http.get('/media')
        .then(function(res){
            $scope.mediaArr = res.data;
            processVideo();
        })
    }
    function processVideo(){
        for (var i = 0; i < $scope.mediaArr.length; i++) {
            if($scope.mediaArr[i].type === 'video'){
                $scope.mediaArr[i].url = $sce.trustAsResourceUrl($scope.mediaArr[i].url)
            }
        };
    }
    getMedia();
    $scope.showMediaItem = function(item) {
    	$modal.open({
    	    resolve:{
    	      item: function(){
    	        return item;
    	      }
    	    },
            size: 'lg',
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