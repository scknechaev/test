angular.module('app')
  .controller('CKEditorController', ['$scope', '$http', '$stateParams', 'pageService', '$state', 'ngNotify', 'filepickerService',
    function ($scope, $http, $stateParams, pageService, $state, ngNotify, filepickerService) {
    $scope.savePage = savePage;

    $scope.param = $stateParams.pageId;
    $scope.Page = {
      title: '',
      url:'',
      html:''
    };

    if ($scope.param !== '') {
        pageService.getOnePage($scope.param).then(function (page) {
           $scope.Page = page;
       }, function (err) {
           console.log(err);
       })
    }
    $scope.editorOptions = {
      language: 'en',
    };
    $scope.$on('ckeditor.ready', function (event) {
        $scope.isReady = true;
    });
    $scope.closeAlert = function () {
        $scope.alert = false;
    }
    function savePage () {
        if (!$scope.param) {
            console.log($scope.Page);
            pageService.createPage($scope.Page).then(function (data) {
                $state.go('app.pages');
                ngNotify.set('New page has been successfully created', {
                  position: 'top',
                  theme: 'pure',
                  type: 'success',
                  sticky: false,
                  duration: 2500
                });
            }, function (err) {
                console.log(err);
                if (err.status === 400) {
                    ngNotify.set('Unable to use this url, make sure that the link contains only a-zA-z or this url already exists', {
                      position: 'top',
                      theme: 'pure',
                      type: 'error',
                      sticky: false,
                      duration: 4000
                    });
                    console.log($scope.alart);
                }
            })
        } else {

            pageService.updatePage($scope.Page).then(function (data) {
                console.log($scope.Page.id);
                $state.go('app.pages');
                ngNotify.set('Page has been successfully edited', {
                  position: 'top',
                  theme: 'pure',
                  type: 'success',
                  sticky: false,
                  duration: 2500
                });
            }, function (err) {
                console.log(err);

                if (err.status === 400) {
                    ngNotify.set('Unable to use this url, make sure that the link contains only a-zA-z or this url already exists', {
                      position: 'top',
                      theme: 'pure',
                      type: 'error',
                      sticky: false,
                      duration: 4000
                    });

                }

            })
        }

    }
}]);