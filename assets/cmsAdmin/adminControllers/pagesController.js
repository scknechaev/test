
  adminApp
      .controller('pagesController', ['$scope', '$http', '$location', 'CKEditorService', 'pageService', 'ngDialog',
      function ($scope, $http, $location, CKEditorService, pageService, ngDialog) {
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
              template: 'cmsAdmin/modals/confirmDelPage.html.tmpl',
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

            $location.url('editpage?id=' + page.id);

        }
        function newPage () {
            $location.url('editpage');
      }
  }]);
