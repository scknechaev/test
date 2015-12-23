
  angular.module('app')
      .controller('pagesController', ['$scope', '$http', '$state', 'CKEditorService', 'pageService', '$modal', 'navigationService',
      function ($scope, $http, $state, CKEditorService, pageService, $modal, navigationService) {
        moment.locale('en')
        $scope.pages    = [];
        $scope.editPage = editPage;
        $scope.nav;
        $scope.counter
        getPages();
        getNav();
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

      function getNav(){
            navigationService.getNavs().then(function (result){
               $scope.nav = result.navs;
            })
        }


      $scope.renderNodes = function(pageId){
        $scope.title = '';
        $scope.node = '';
        for(var i = 0; i < $scope.nav.length; i++){
          if($scope.nav[i].nodes.length > 0){
            for(var y = 0; y < $scope.nav[i].nodes.length; y++){
              if($scope.nav[i].nodes[y].id == pageId){
                $scope.title = $scope.nav[i].title;
                if($scope.nav[i].nodes[y].title){
                   $scope.node = "\u0020" + ' > ' + "\u0020" + $scope.nav[i].nodes[y].title;
                }
                return $scope.title + '  ' + $scope.node;
              }
            }
          }else if($scope.nav[i].id == pageId){
            $scope.title = $scope.nav[i].title
            return $scope.title;
          }
          
        }
      }

  }]);
