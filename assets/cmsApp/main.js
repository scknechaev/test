(function () {
  	'use strict';
  	
  	var cmsApp = angular.module('cmsApp', [
    	'ngRoute'
  	]);

  	$('form.registartion-form').submit(authOrRegRequest);

  	function authOrRegRequest (e) {
  		var form 	   = $(this),
  			actionType = form.data('type'),
  			requestObj = {};

  		requestObj = getRequestConfig(actionType, form);
  		makeRequest(requestObj);

		e.originalEvent.returnValue = false;
	}

	function getRequestConfig (actType, form) {
		var reqObj = {
			type: 'post'
		};

  		if (actType === 'register') {		// register
  			reqObj.url 		= '/register';

  			reqObj.data 	= {
  				'name': form.find('input[name=name]').val(),
				'email': form.find('input[name=email]').val(),
				'password' : form.find('input[name=password]').val(),
				'role': form.find('input[name=role]').val()
  			};

  			reqObj.callback = function (resObj) {
 				var response = JSON.parse(resObj.responseText);

 				if (response.message === "user created") {
 					location.assign('/login');
 				}
  			};
  		} else if (actType === 'login') {	// login
  			reqObj.url 		= '/login';

  			reqObj.data 	= {
				'email': form.find('input[type=email]').val(),
				'password' : form.find('input[type=password]').val()
  			};

  			reqObj.callback = function (resObj) {
				var errorMessage = 'Ошибка! Проверьте правильность ввода эл. почты или пароля',
					response;

				try {
					response = JSON.parse(resObj.responseText);
				} catch (err) {
					location.assign('/admin');
					return;
				}

				showError($('.validate-field'), errorMessage);
			};
  		}

  		return reqObj;
	}

	function makeRequest (reqObj) {

		$.ajax({
			url: reqObj.url,
   			type: reqObj.type,
			data: reqObj.data,
			complete: reqObj.callback
		});
	}

	function showError (errorField, errorMessage) {
		var fadeTime = 700;

		errorField
			.hide()
			.fadeIn(fadeTime)
			.find('.validation-message')
			.text(errorMessage);
	}
})();