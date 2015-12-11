
  angular.module('app')
      .controller('pagesController', ['$scope', '$http', '$state', 'CKEditorService', 'pageService', 'ngDialog',
      function ($scope, $http, $state, CKEditorService, pageService, ngDialog) {
        moment.locale('ru')
        $scope.pages    = [];
        $scope.editPage = editPage;
        
        getPages();

        $scope.delPage = function (page, $index) {
            pageService.delPage(page).then(function (page) {
                      $scope.pages.splice($index, 1);
                    })
          }

        $scope.openConfirmDelPage = function (page, index) {
          ngDialog.open({
              template: 'cmsAdmin/tpl/modals/confirmDelPage.html.tmpl',
              scope: $scope,
              controller: ['$scope', function($scope) {
                  $scope.index = index;
                  $scope.page =  page;
                  setTimeout(function(){
                      $('.modal-footer .btn.btn-danger').focus();
                  },200);
              }]
          });
        };

        function getPages () {
            pageService.getPages().then(function (result) {
                  $scope.pages = result;
              })
        }
        
        function editPage (page) {
            CKEditorService.selectedPage = page;

            $state.go('app.editpage', {pageId: page.id});

        }
        function newPage () {
            $state.go('app.editpage');
      }
  }]);
