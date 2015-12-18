angular.module('app')
  .controller('menuController', [
    '$scope',
    'navigationService',
    '$modal',
    'pageService',
    'ngNotify',
    function ($scope, navigationService, $modal, pageService, ngNotify) {
        // $scope.pageUrl = navigationService.getUrl();
        $scope.navs = [];
        // $scope.Form = {};
        $scope.remove = function (scope) {
          scope.remove();
        };

        $scope.toggle = function (scope) {
          scope.toggle();
        };

        $scope.newSubItem = function (scope) {
          var nodeData = scope.$modelValue;
          nodeData.nodes.push({
            id: nodeData.id * 10 + nodeData.nodes.length,
            title: nodeData.title + '.' + (nodeData.nodes.length + 1),
            nodes: []
          });
        };
        $scope.getNodes = function () {
            navigationService.getNavs().then(function (navs) {
                if(navs){
                    $scope.navs = navs.navs;
                } else {
                    $scope.navs = [];
                }
                console.log(navs);
            }, function (err) {
                console.log(err);
            });
        }
        $scope.getPages = function () {
            pageService.getPages().then(function (data) {
                $scope.pages = data;
            }, function (err) {
                console.log(err);
            })
        }
        $scope.getNodes();
        $scope.getPages();

        $scope.createNode = function(){
          $scope.navs.push(
            {
              "title": "",
              "nodes": []
            }
          )
        }

        $scope.setUrl = function(id){
            if(id === undefined){
                return
            }
            for (var i = 0; i < $scope.pages.length; i++) {
                if($scope.pages[i].id === id){
                    return $scope.pages[i].url;
                }
            };
        }

        $scope.saveChanges = function(){
          navigationService.editNav($scope.navs)
          .then(function(node){
            ngNotify.set('Menu has been successfully updated', {
                  position: 'top',
                  theme: 'pure',
                  type: 'success',
                  sticky: false,
                  duration: 2500
            });
          })
            
        }

        // $scope.setModalState = function (editingNav) {
        //     $scope.Form.navModalForm.name.$setPristine();
        //     $scope.Form.navModalForm.name.$setUntouched();
        //     $scope.isEditing = false;

        //     if (editingNav) {
        //         $scope.isEditing = true;
        //         $scope.nav       = editingNav;
        //         $scope.navCopy   = Object.create(editingNav);
        //     } else {
        //         $scope.navCopy = {};
        //     }

        //     resetModalState($scope.navModal);
        // };

        // $scope.delNav = function (nav, index) {
        //     navigationService.delNav(nav).then (function (data) {
        //         $scope.navs.splice(index, 1);
        //     }, function (err) {
        //         console.log('error deleting nav');
        //     })
        // };
        // $scope.openConfirmDelNav = function (nav, index) {
        //   $modal.open({
        //       templateUrl: 'cmsAdmin/tpl/modals/confirmDelNav.html.tmpl',
        //       resolve: {
        //         nav : function () {
        //           return nav;
        //         },
        //         index : function () {
        //           return index;
        //         }
        //       },
        //       controller: ['$scope', '$modalInstance', 'nav', 'index', function($scope, $modalInstance, nav, index) {
        //           $scope.index = index;
        //           $scope.nav =  nav;
        //           setTimeout(function(){
        //               $('.modal-footer .btn.btn-danger').focus();
        //           },200);
        //           $scope.cancel = function () {
        //               $modalInstance.dismiss('cancel');
        //           };
        //       }]
        //   });
        // };

        // function resetModalState (modalWindow) {
        //     modalWindow.alert       = false;
        //     modalWindow.modalClosed = false;
        // }

        
}]);


