angular.module('app')
  .controller('CKEditorController', ['$scope', '$http', '$stateParams', 'pageService', '$state', 'ngNotify', 'filepickerService', 'CKEditorService', '$modal', '$q',
    function ($scope, $http, $stateParams, pageService, $state, ngNotify, filepickerService, CKEditorService, $modal, $q) {
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
    };

    CKEDITOR.on('instanceReady', function (ev) {
        // ev.removeListener();

        ev.editor.on('beforeCommandExec', function (evt) {
            if (evt.data.name === 'image') {
                evt.cancel();

                showUploadMediaModal().then(function (data) {
                    if (data.type === 'image' && CKEDITOR.instances['page-editor']) {
                        CKEDITOR.instances['page-editor'].insertHtml('<img src="' + data.url + '" alt="image" style="max-width: 100%">');
                    } else if (data.type === 'video' && CKEDITOR.instances['page-editor']) {
                        CKEDITOR.instances['page-editor'].insertHtml('<video controls src="' + data.url + '" ></video>');
                    }
                });

            }
        }, null, null, 0);
    });

    function showUploadMediaModal(item) {
        var deferred = $q.defer();
        var modalInstance = $modal.open({
            templateUrl: 'cmsAdmin/tpl/modals/uploadMediaModal.html.tmpl',
            controller: ['$scope', '$modalInstance',
              function ($scope, $modalInstance) {
                $scope.selectedFile = {};
                $scope.upload = function () {
                    CKEditorService.postMedia($scope.selectedFile).then(function (res) {
                        console.log(res);

                        $modalInstance.close({
                            url: res.url,
                            type: res.type
                        });
                    });
                };
                $scope.onFileSelect = function ($files) {
                    $scope.selectedFile = $files;
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }]
        });

        modalInstance.result.then(function (url) {
            deferred.resolve(url);
        }, function () {
            deferred.reject();
        });

        return deferred.promise;
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