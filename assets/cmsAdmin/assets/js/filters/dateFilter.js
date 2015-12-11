(function(){
	'use strict';
	angular.module('app')
	.filter('datetime', function() {
	  return function(input) {
	    if (moment(input).isValid()){
	      return moment.utc(input).format('YYYY-MM-DD HH:mm');
	    } else {
	      return input;
	    }
	  };
	});
	angular.module('app')
	.filter('time', function() {
	  return function(input) {
	    if (moment(input).isValid()){
	      return moment.utc(input).format('HH:mm');
	    } else {
	      return input;
	    }
	  };
	});
	angular.module('app')
	.filter('date', function() {
	  return function(input) {
	    if (moment(input).isValid()){
			var data = moment.utc(input).format('LL');
        	return data.substr(0,data.length - 8);
	    } else {
	      return input;
	    }
	  };
	});
	angular.module('app')
	.filter('timeUtc', function() {
	  return function(input) {
	    if (moment(input).isValid()){
	      return moment(input).format('HH:mm');
	    } else {
	      return input;
	    }
	  };
	});
	angular.module('app')
	.filter('dateUtc', function() {
	  return function(input) {
	    if (moment(input).isValid()){
			var data = moment(input).format('LL');
        	return data;
	    } else {
	      return input;
	    }
	  };
	});
	angular.module('app')
	.filter('dateTimeUtc', function() {
	  return function(input) {
	    if (moment(input).isValid()){
	      return moment(input).format('LL HH:mm');
	    } else {
	      return input;
	    }
	  };
	});
}());