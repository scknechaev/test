angular.module('app')
  .controller('menuController', [
    '$scope',
    'navigationService',
    'ngDialog',
    function ($scope, navigationService, ngDialog) {
        $scope.pageUrl = navigationService.getUrl();
        getNavs($scope);
        $scope.Form = {};

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
          ngDialog.open({
              template: 'cmsAdmin/tpl/modals/confirmDelNav.html.tmpl',
              scope: $scope,
              controller: ['$scope', function($scope) {
                  $scope.index = index;
                  $scope.nav =  nav;
                  setTimeout(function(){
                      $('.modal-footer .btn.btn-danger').focus();
                  },200);
              }]
          });
        };

        function resetModalState (modalWindow) {
            modalWindow.alert       = false;
            modalWindow.modalClosed = false;
        }

        function getNavs ($scope) {
            navigationService.getNavs().then(function (navs) {
                $scope.navs = navs;
                console.log(navs);
            }, function (err) {
                console.log(err);
            });
        }
}]);


