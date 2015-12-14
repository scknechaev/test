
  angular.module('app')
      .controller('pagesController', ['$scope', '$http', '$state', 'CKEditorService', 'pageService', '$modal',
      function ($scope, $http, $state, CKEditorService, pageService, $modal) {
        moment.locale('en')
        $scope.pages    = [];
        $scope.editPage = editPage;
        
        getPages();

        

        $scope.openConfirmDelPage = function (page, index) {
          $modal.open({
              resolve:{
                page: function(){
                  return page;
                },
                pages: function(){
                  return $scope.pages;
                },
                index: function(){
                  return index;
                }
              },
              templateUrl: 'cmsAdmin/tpl/modals/confirmDelPage.html.tmpl',
              controller: ['$scope', '$modalInstance', 'page', 'pages', 'pageService', 'index',
                function($scope, $modalInstance, page, pages, pageService, index) {
                  $scope.index = index;
                  $scope.page =  page;
                  $scope.pages =  pages;
                  $scope.delPage = function (page, $index) {
                      pageService.delPage(page).then(function (page) {
                        $scope.pages.splice($index, 1);
                      })
                  }
                  $scope.cancel = function () {
                      $modalInstance.dismiss('cancel');
                  };
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
