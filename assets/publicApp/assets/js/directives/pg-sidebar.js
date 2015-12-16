/* ============================================================
 * Directive: pgSidebar
 * AngularJS directive for Pages Sidebar jQuery plugin
 * ============================================================ */

angular.module('publicApp')
    .directive('pgSidebar', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var $sidebar = $(element);
            	$sidebar.sidebar($sidebar.data());
            }
        }
    });