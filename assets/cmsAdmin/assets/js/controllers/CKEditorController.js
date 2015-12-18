angular.module('app')
  .controller('CKEditorController', ['$scope', '$http', '$stateParams', 'pageService', '$state', 'ngNotify', 'filepickerService', 'CKEditorService', '$modal', '$q',
    function ($scope, $http, $stateParams, pageService, $state, ngNotify, filepickerService, CKEditorService, $modal, $q) {
    $scope.savePage = savePage;

    $scope.param = $stateParams.pageId;
    $scope.Page = {
      title: '',
      url:'',
      html:'',
      tags:[]
    };


    if ($scope.param !== '') {
        pageService.getOnePage($scope.param).then(function (page) {
           $scope.Page = page;
           renderPagesTags();
       }, function (err) {
           console.log(err);
       })
    }
    $scope.editorOptions = {
      language: 'en',
        removeButtons: 'Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,' +
        'Textarea,Select,Button,ImageButton,HiddenField,BidiLtr,BidiRtl,' +
        'About,TextColor,BGColor,Flash,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,',
        removePlugins: 'Language'
    };
    $scope.$on('ckeditor.ready', function (event) {
        $scope.isReady = true;
    });
    $scope.closeAlert = function () {
        $scope.alert = false;
    };

    CKEDITOR.on('instanceReady', function (ev) {
        // ev.removeListener();

        ev.editor.on( 'configLoaded', function() {
            // Remove unnecessary plugins to make the editor simpler.
            //editor.config.removePlugins = 'colorbutton,find,flash,font,' +
            //    'forms,iframe,image,newpage,removeformat,' +
            //    'smiley,specialchar,stylescombo,templates,find,replace,selectall,spellchecker';
            // Rearrange the layout of the toolbar.
            //editor.config.toolbarGroups = [
            //    { name: 'editing',		groups: [ 'basicstyles', 'links' ] },
            //    { name: 'undo' },
            //    { name: 'clipboard',	groups: [ 'selection', 'clipboard' ] },
            //    { name: 'about' }
            //];
        });

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

    function renderPagesTags() {
        if ($scope.Page.tags) {
            var values = $scope.Page.tags.join();
            document.getElementById('tags').value = values;
            $('#tags').tagsinput('destroy');
            $('#tags').tagsinput();
        }
    }

    function savePage () {
        $scope.Page.tags = $('#tags').tagsinput('items')
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
