(function () {
    'use strict';
    angular.module('app').directive('emailValidation', function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                var isValid = function(value){
                    return /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(value);
                }
                ctrl.$parsers.unshift(function (viewValue) {
                    ctrl.$setValidity('emailValid', isValid(viewValue));
                    return viewValue;
                });

                ctrl.$formatters.unshift(function (modelValue) {
                    ctrl.$setValidity('emailValid', isValid(modelValue));
                    return modelValue;
                });
            }
        };
    });
})();