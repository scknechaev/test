angular.module('app')
  .controller('menuController', [
    '$scope',
    'navigationService',
    '$modal',
    function ($scope, navigationService, $modal) {
        $scope.pageUrl = navigationService.getUrl();
        $scope.navs = [];
        $scope.Form = {};

        $scope.getNavs = function () {
            navigationService.getNavs().then(function (navs) {
                $scope.navs = navs;
                console.log(navs);
            }, function (err) {
                console.log(err);
            });
        }
        $scope.getNavs();

        $scope.setModalState = function (editingNav) {
            $scope.Form.navModalForm.name.$setPristine();
            $scope.Form.navModalForm.name.$setUntouched();
            $scope.isEditing = false;

            if (editingNav) {
                $scope.isEditing = true;
                $scope.nav       = editingNav;
                $scope.navCopy   = Object.create(editingNav);
            } else {
                $scope.navCopy = {};
            }

            resetModalState($scope.navModal);
        };

        $scope.delNav = function (nav, index) {
            navigationService.delNav(nav).then (function (data) {
                $scope.navs.splice(index, 1);
            }, function (err) {
                console.log('error deleting nav');
            })
        };
        $scope.openConfirmDelNav = function (nav, index) {
          $modal.open({
              templateUrl: 'cmsAdmin/tpl/modals/confirmDelNav.html.tmpl',
              resolve: {
                nav : function () {
                  return nav;
                },
                index : function () {
                  return index;
                }
              },
              controller: ['$scope', '$modalInstance', 'nav', 'index', function($scope, $modalInstance, nav, index) {
                  $scope.index = index;
                  $scope.nav =  nav;
                  setTimeout(function(){
                      $('.modal-footer .btn.btn-danger').focus();
                  },200);
                  $scope.cancel = function () {
                      $modalInstance.dismiss('cancel');
                  };
              }]
          });
        };

        function resetModalState (modalWindow) {
            modalWindow.alert       = false;
            modalWindow.modalClosed = false;
        }

        
}]);


