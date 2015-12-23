
  angular.module('app')
      .controller('pagesController', ['$scope', '$http', '$state', 'CKEditorService', 'pageService', '$modal', 'navigationService', '$timeout', 'ngNotify',
      function ($scope, $http, $state, CKEditorService, pageService, $modal, navigationService, $timeout, ngNotify) {
        moment.locale('en')
        $scope.pages    = [];
        $scope.editPage = editPage;
        $scope.nav;
        $scope.counter
        var pagesTable;
        var tableOptions = {
          "sDom":"t",
          "sPaginationType":"bootstrap",
          "destroy":true,
          "paging":false,
          "scrollCollapse":true
        }
        getPages();
        getNav();

        $scope.openConfirmDelPage = function (page, index, $event) {
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
                },
                target: function(){
                  return $event.target;
                }
              },
              templateUrl: 'cmsAdmin/tpl/modals/confirmDelPage.html.tmpl',
              controller: ['$scope', '$modalInstance', 'page', 'pages', 'pageService', 'index', 'target',
                function($scope, $modalInstance, page, pages, pageService, index, target) {
                  $scope.index = index;
                  $scope.page =  page;
                  $scope.target = target;
                  $scope.pages =  pages;
                  $scope.delPage = function (page, index) {
                      // var pagesTable = $('#pages-table');
                      pageService.delPage(page).then(function (page) {
                        // pagesTable.dataTable().fnDestroy();
                        ngNotify.set('Page has been deleted', {
                              position: 'top',
                              theme: 'pure',
                              type: 'success',
                              sticky: false,
                              duration: 2500
                        });
                        $timeout(function(){
                          // pagesTable.DataTable(tableOptions);
                          pagesTable.row( $($scope.target).parents('tr') )
                                  .remove()
                                  .draw();
                        },100);
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
                  $timeout(function(){
                    pagesTable = $('#pages-table').DataTable(tableOptions);
                  },100);
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
