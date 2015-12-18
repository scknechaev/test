angular.module('app').service('CKEditorService', ['baseService', 'Upload', '$q', function (baseService, Upload, $q) {

    /**
     * Conctructor, for creating of service used in page controller
     */
    function CKEditorService () {

    }

    CKEditorService.prototype = Object.create(baseService);

    /**
     * Upload media file
     */
    CKEditorService.prototype.postMedia = function (file) {
        var deferred = $q.defer();

        Upload.upload({
            url: '/media',
            file: file
        }).success(function (response, status, headers, config) {
            deferred.resolve(response, status, headers, config);
        }).error(function (response, status, headers, config) {
            deferred.reject(response, status, headers, config);
        });

        return deferred.promise;
    };

    return new CKEditorService;
}]);

