angular.module('app')
	.controller('mediaController', ['$scope', '$modal', '$http', '$sce', 'ngNotify',
 	function ($scope, $modal, $http, $sce, ngNotify) {
    $scope.mediaArr = [];
    getMedia();

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

    $scope.showMediaItem = function(item, mediaArr) {
    	$modal.open({
    	    resolve:{
    	      item: function() {
    	        return item;
    	      },
              items: function() {
                return mediaArr;
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

                $scope.delete = function (itemFile) {
                    $http.delete('/media/' + itemFile.id)
                    .then(function (data) {
                        ngNotify.set('File successfuly deleted', {
                          'position': 'top',
                          'theme'   : 'pure',
                          'type'    : 'success',
                          'sticky'  : false,
                          'duration': 2500
                        });

                        _.pull(mediaArr, itemFile);
                        $modalInstance.dismiss('cancel');
                    }, function (err) {
                        ngNotify.set('Some error while deleting file', {
                          'position': 'top',
                          'theme'   : 'pure',
                          'type'    : 'error',
                          'sticky'  : false,
                          'duration': 4000
                        });
                    });
                };

    	    }]
    	});
    }
}]);