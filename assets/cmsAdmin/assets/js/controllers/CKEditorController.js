angular.module('app')
  .controller('CKEditorController', ['$scope', '$http', '$stateParams', 'pageService', '$state', 'ngNotify', 'filepickerService', 'CKEditorService', '$modal', '$q', '$sce',
    function ($scope, $http, $stateParams, pageService, $state, ngNotify, filepickerService, CKEditorService, $modal, $q, $sce) {
    $scope.savePage = savePage;

    $scope.param = $stateParams.pageId;
    $scope.Page = {
      title: '',
      url:'',
      html:'',
      tags:[]
    };
    $scope.editorMode = false;

    if ($scope.param !== '') {
        pageService.getOnePage($scope.param).then(function (page) {
           $scope.Page = page;
           CKEDITOR.instances['page-editor'].setData(page.html);
           renderPagesTags();
       }, function (err) {
           console.log(err);
       })
    } else {
      renderPagesTags();
    }
    $scope.editorOptions = {
      language: 'en',
        removeButtons: 'Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,ImageButton,TextField,' +
        'Textarea,Select,Button,HiddenField,BidiLtr,BidiRtl,' +
        'About,TextColor,BGColor,Flash,HorizontalRule,Smiley,SpecialChar,Image,PageBreak,' +
        'Iframe,Styles,Format,Font,FontSize',
        removePlugins: 'language',
        extraAllowedContent: 'video[*]{*};source[*]{*};img[*]{*};h1;h2;h3;h4;h5;h6;'
    };
    $scope.$on('ckeditor.ready', function (event) {
        $scope.isReady = true;
    });
    $scope.closeAlert = function () {
        $scope.alert = false;
    };

    function getMedia() {
        $http.get('/media')
        .then(function(res){
            $scope.mediaArr = res.data;
        })
    }
    getMedia();

    $scope.showUploadModal = showUploadModal;
    $scope.showChooseMediaModal = showChooseMediaModal;

    // CKEDITOR.editorConfig = function( config ) {
    //     // Define changes to default configuration here. For example:
    //     // Referencing the new plugin
    //     config.extraPlugins = 'video';
    // };

    CKEDITOR.on('instanceReady', function (ev) {
        ev.editor.on('beforeCommandExec', function (evt) {
            if (evt.data.name === 'image') {
                evt.cancel();
                showUploadModal();
            }
        }, null, null, 0);
        CKEDITOR.instances['page-editor'].on('mode',function(e){
          var mode = e.editor.mode;
          $scope.$apply(function(){
            if(mode === "source"){
              $scope.editorMode = true;
            } else {
              $scope.editorMode = false;
            }
          })
        });
    });

    function showUploadModal() {
        showUploadMediaModal().then(function (data) {
            if (CKEDITOR.instances['page-editor']) {
                CKEDITOR.instances['page-editor'].insertHtml('[' + data.name + ']');
            }
        });
    }

    function showUploadMediaModal() {
        var deferred = $q.defer();
        var modalInstance = $modal.open({
            templateUrl: 'cmsAdmin/tpl/modals/uploadMediaModal.html.tmpl',
            controller: ['$scope', '$modalInstance',
              function ($scope, $modalInstance) {
                $scope.isUploading = false;
                $scope.uploadButtonText = 'Upload';

                $scope.selectedFile = {};
                $scope.upload = function () {
                    $scope.uploadButtonText = 'Uploading...';
                    $scope.isUploading = true;

                    $scope.uploadPromise = CKEditorService.postMedia($scope.selectedFile).then(function (res) {
                        $scope.isUploading = false;
                        $modalInstance.close({
                            url: res.url,
                            type: res.type,
                            id: res.id,
                            name: res.name
                        });
                    }, function (errorMessage) {
                      $scope.isUploading      = false;
                      $scope.uploadButtonText = 'Upload';
                      
                      notifyUser(errorMessage || 'Some error while Uploading file', false);
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
    function showChooseMediaModal() {
        var modalInstance = $modal.open({
            templateUrl: 'cmsAdmin/tpl/modals/chooseMediaModal.html.tmpl',
            resolve: {
              mediaArr : function(){
                return $scope.mediaArr;
              }
            },
            controller: ['$scope', '$modalInstance', 'mediaArr',
              function ($scope, $modalInstance, mediaArr) {
                $scope.file = {};
                $scope.mediaArr = mediaArr;
                $scope.choose = function () {
                  if (CKEDITOR.instances['page-editor']) {
                    $modalInstance.dismiss('cancel');
                      CKEDITOR.instances['page-editor'].insertHtml('['+ $scope.file.name +']');
                  }
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }]
        });
    }

    function renderPagesTags () {
        if ($scope.Page.tags) {
            var values = $scope.Page.tags.join();
            document.getElementById('tags').value = values;
        }
        $('#tags').tagsinput();
    }


    function savePage () {
        $scope.Page.url = $scope.Page.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(new RegExp(' ','g'),'-');
        $scope.Page.html = CKEDITOR.instances['page-editor'].getData();
        var parsedHtml = $.parseHTML($scope.Page.html);
        var mediaArr = $(parsedHtml).find('[data-id]');
        var mediaIdsArr = _.map(mediaArr, function(i){return $(i).attr('data-id'); });
        $scope.Page.media = _.uniq(mediaIdsArr);
        $scope.Page.tags = $('#tags').tagsinput('items');

        if ( !isNeedUpdate($scope.param) ) {
            pageService.createPage($scope.Page, function (data) {
              $state.go('app.pages');

              notifyUser('New page has been successfully created', true);
            }, function (err) {
              if (err.status === 400) {
                notifyUser('such header already exists', false);
              } else if (err.status === 500) {
                notifyUser(err.data.raw, false);
              } else {
                notifyUser('Error', false);
              }
            });
        } else {
            pageService.updatePage($scope.Page, function (data) {
              $state.go('app.pages');
              notifyUser('Page has been successfully edited', true);
            }, function (err) {
              if (err.status === 400) {
                notifyUser('such header already exists', false);
              } else if (err.status === 500) {
                notifyUser(err.data.raw, false);
              } else {
                notifyUser('Error', false);
              }
            });

        }

    }

  /**
   * @name isNeedUpdate
   * @desc Checking is user want to update user
   * @param pageId - id of the page
   */
    function isNeedUpdate(pageId) {
      return pageId;
    }

    /**
     * @name notifyUser
     * @desc Notifying user about maked request
     * @param message   - message to user about operation
     *        isSuccess - is operation was successful 
     */
    function notifyUser(message, isSuccess) {

      if (isSuccess) {
        ngNotify.set(message, {
          'position': 'top',
          'theme'   : 'pure',
          'type'    : 'success',
          'sticky'  : false,
          'duration': 2500
        });
      } else {
        ngNotify.set(message, {
          'position': 'top',
          'theme'   : 'pure',
          'type'    : 'error',
          'sticky'  : false,
          'duration': 4000
        });
      }
    
    }

}]);
