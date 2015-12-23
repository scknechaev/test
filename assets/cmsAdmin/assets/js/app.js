/* ============================================================
 * File: app.js
 * Configure global module dependencies. Page specific modules
 * will be loaded on demand using ocLazyLoad
 * ============================================================ */

angular.module('app', [
    'ui.router',
    'ui.utils',
    'ngCkeditor',
    'oc.lazyLoad',
    'ui.bootstrap',
    'ngNotify',
    'angular-filepicker',
    'ui.tree',
    'ngFileUpload',
    'ngSanitize',
    'trNgGrid',
    'cgBusy'
]);
