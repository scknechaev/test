adminApp.controller('CKEditorController', ['$scope', '$http', '$route', 'pageService', '$location', 'ngNotify', 
    function ($scope, $http, $route, pageService, $location, ngNotify) {
    $scope.savePage = savePage;

    $scope.params = $route.current.params;

    if (angular.isDefined($scope.params.id)) {
        pageService.getOnePage($scope.params.id).then(function (page) {
           $scope.Page = page;
       }, function (err) {
           console.log(err);
       })
    }
    $scope.editorOptions = {
      language: 'ru',
    };
    $scope.$on('ckeditor.ready', function (event) {
        $scope.isReady = true;
    });
    $scope.closeAlert = function () {
        $scope.alert = false;
    }
    function savePage () {
        if (angular.isUndefined($scope.params.id)) {
            pageService.createPage($scope.Page).then(function (data) {
                $location.url('pages');
                ngNotify.set('Новая страница успешно создана', {
                  position: 'top',
                  theme: 'pure',
                  type: 'success',
                  sticky: false,
                  duration: 2500
                });
            }, function (err) {
                console.log(err);
                if (err.status === 400) {
                    ngNotify.set('Невозможно использование данной ссылки, убедитесь что ссылка содержит только a-zA-z или данная ссылка уже существует', {
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
                $location.url('pages');
                ngNotify.set('Страница успешно отредактирована', {
                  position: 'top',
                  theme: 'pure',
                  type: 'success',
                  sticky: false,
                  duration: 2500
                });
            }, function (err) {
                console.log(err);

                if (err.status === 400) {
                    ngNotify.set('Невозможно использование данной ссылки, убедитесь что ссылка содержит только a-zA-z или данная ссылка уже существует', {
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