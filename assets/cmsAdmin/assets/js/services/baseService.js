angular.module('app').factory('baseService', [
	'$http',
	'$location',
	function ($http, $location) {

	    /**
	     * Conctructor, for creating of base service, from which all 
	     * services will extends
	     */
		function BaseService () {

		}

		/**
	     * show alert when something heapened (data transfered, exeption, error while transfer or other)
	     */
		BaseService.prototype.showAlert = function ($scope, message, type) {
			$scope.alert = {
				'type': type,
                'msg': message
			};
		};

		/**
	     * set user email to lower case (editing, creating, registration)
	     */
		BaseService.prototype.emailToLowerCase = function (user) {
	        var email;

	        if (user && user.email) {
	            email = user.email;

	            user.email = email.toLowerCase();
	        }
		};

		/**
	     * check is all parameters in the form is valid
	     */
		BaseService.prototype.isValidateOk = function (user, $scope, usersAttrs) {
	        var isValid = true;

	        usersAttrs.forEach(function (attr) {

	            if ( (user[attr] === '') || (user[attr] == null) ) {
	                $scope.validate[attr] = 'has-error';
	                isValid = false;
	            } else {
	                $scope.validate[attr] = '';
	            }
	        });

	        return isValid;
		};

		/**
	     * copy user from modal window to main
	     */
		BaseService.prototype.copyUser = function (mainUser, modalUser) {

	        for (var key in modalUser) {

	            if (modalUser.hasOwnProperty(key)) {
	                mainUser[key] = modalUser[key];
	            }
	        }
		};

		/**
	     * Return current url with port
	     */
		BaseService.prototype.getUrl = function () {
			return $location.$$host + ':' + $location.$$port;
		};

	    /**
	     * Default callback that calls when requesting successed
	     */
		BaseService.prototype.successCall = function (data) {
			return data.data;
		};

	    /**
	     * Default callback that calls when requesting failed
	     */
		BaseService.prototype.errorCall = function (error) {
			return error;
		};

	    /**
	     * Determine what method must be called when request is done
	     */
		BaseService.prototype.determHandler = function (callback, isSuccessCall) {

			if (callback && (typeof callback === 'function')) {
				return callback;
			}

			return isSuccessCall ? this.successCall : this.errorCall;
		};

	    /**
	     * Requesting data from server
	     */
		BaseService.prototype.request = function (reqType, url, data, successCall, errorCall) {
			return $http[reqType](url, data || {}).then(this.determHandler(successCall, true), this.determHandler(errorCall, false));
		};

		return new BaseService;
}]);