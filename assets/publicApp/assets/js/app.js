/* ============================================================
 * File: app.js
 * Configure global module dependencies. Page specific modules
 * will be loaded on demand using ocLazyLoad
 * ============================================================ */

angular.module('publicApp', ['ui.router', 'ui.utils', 'ct.ui.router.extras', 'oc.lazyLoad','ui.bootstrap', 'ngNotify']);