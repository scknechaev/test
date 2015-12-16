/* ============================================================
 * File: config.lazyload.js
 * Configure modules for ocLazyLoader. These are grouped by 
 * vendor libraries. 
 * ============================================================ */

angular.module('app')
    .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true,
            events: true,
            modules: [{
                    name: 'isotope',
                    files: [
                        '../../../dependencies/plugins/imagesloaded/imagesloaded.pkgd.min.js',
                        '../../../dependencies/plugins/jquery-isotope/isotope.pkgd.min.js'
                    ]
                }, {
                    name: 'codropsDialogFx',
                    files: [
                        '../../../dependencies/plugins/codrops-dialogFx/dialogFx.js',
                        '../../../dependencies/plugins/codrops-dialogFx/dialog.css',
                        '../../../dependencies/plugins/codrops-dialogFx/dialog-sandra.css'
                    ]
                }, {
                    name: 'metrojs',
                    files: [
                        '../../../dependencies/plugins/jquery-metrojs/MetroJs.min.js',
                        '../../../dependencies/plugins/jquery-metrojs/MetroJs.css'
                    ]
                }, {
                    name: 'owlCarousel',
                    files: [
                        '../../../dependencies/plugins/owl-carousel/owl.carousel.min.js',
                        '../../../dependencies/plugins/owl-carousel/assets/owl.carousel.css'
                    ]
                }, {
                    name: 'noUiSlider',
                    files: [
                        '../../../dependencies/plugins/jquery-nouislider/jquery.nouislider.min.js',
                        '../../../dependencies/plugins/jquery-nouislider/jquery.liblink.js',
                        '../../../dependencies/plugins/jquery-nouislider/jquery.nouislider.css'
                    ]
                }, {
                    name: 'nvd3',
                    files: [
                        '../../../dependencies/plugins/nvd3/lib/d3.v3.js',
                        '../../../dependencies/plugins/nvd3/nv.d3.min.js',
                        '../../../dependencies/plugins/nvd3/src/utils.js',
                        '../../../dependencies/plugins/nvd3/src/tooltip.js',
                        '../../../dependencies/plugins/nvd3/src/interactiveLayer.js',
                        '../../../dependencies/plugins/nvd3/src/models/axis.js',
                        '../../../dependencies/plugins/nvd3/src/models/line.js',
                        '../../../dependencies/plugins/nvd3/src/models/lineWithFocusChart.js',
                        '../../../dependencies/plugins/angular-nvd3/angular-nvd3.js',
                        '../../../dependencies/plugins/nvd3/nv.d3.min.css'
                    ],
                    serie: true // load in the exact order
                }, {
                    name: 'rickshaw',
                    files: [
                        '../../../dependencies/plugins/nvd3/lib/d3.v3.js',
                        '../../../dependencies/plugins/rickshaw/rickshaw.min.js',
                        '../../../dependencies/plugins/angular-rickshaw/rickshaw.js',
                        '../../../dependencies/plugins/rickshaw/rickshaw.min.css',
                    ],
                    serie: true
                }, {
                    name: 'sparkline',
                    files: [
                    '../../../dependencies/plugins/jquery-sparkline/jquery.sparkline.min.js',
                    '../../../dependencies/plugins/angular-sparkline/angular-sparkline.js'
                    ]
                }, {
                    name: 'mapplic',
                    files: [
                        '../../../dependencies/plugins/mapplic/js/hammer.js',
                        '../../../dependencies/plugins/mapplic/js/jquery.mousewheel.js',
                        '../../../dependencies/plugins/mapplic/js/mapplic.js',
                        '../../../dependencies/plugins/mapplic/css/mapplic.css'
                    ]
                }, {
                    name: 'skycons',
                    files: ['../../../dependencies/plugins/skycons/skycons.js']
                }, {
                    name: 'switchery',
                    files: [
                        '../../../dependencies/plugins/switchery/js/switchery.min.js',
                        '../../../dependencies/plugins/ng-switchery/ng-switchery.js',
                        '../../../dependencies/plugins/switchery/css/switchery.min.css',
                    ]
                }, {
                    name: 'menuclipper',
                    files: [
                        '../../../dependencies/plugins/jquery-menuclipper/jquery.menuclipper.css',
                        '../../../dependencies/plugins/jquery-menuclipper/jquery.menuclipper.js'
                    ]
                }, {
                    name: 'wysihtml5',
                    files: [
                        '../../../dependencies/plugins/bootstrap3-wysihtml5/bootstrap3-wysihtml5.min.css',
                        '../../../dependencies/plugins/bootstrap3-wysihtml5/bootstrap3-wysihtml5.all.min.js'
                    ]
                }, {
                    name: 'stepsForm',
                    files: [
                        '../../../dependencies/plugins/codrops-stepsform/css/component.css',
                        '../../../dependencies/plugins/codrops-stepsform/js/stepsForm.js'
                    ]
                }, {
                    name: 'jquery-ui',
                    files: ['../../../dependencies/plugins/jquery-ui-touch/jquery.ui.touch-punch.min.js']
                }, {
                    name: 'moment',
                    files: ['../../../dependencies/plugins/moment/moment.min.js',
                        '../../../dependencies/plugins/moment/moment-with-locales.min.js'
                    ]
                }, {
                    name: 'hammer',
                    files: ['../../../dependencies/plugins/hammer.min.js']
                }, {
                    name: 'sieve',
                    files: ['../../../dependencies/plugins/jquery.sieve.min.js']
                }, {
                    name: 'line-icons',
                    files: ['../../../dependencies/plugins/simple-line-icons/simple-line-icons.css']
                }, {
                    name: 'ionRangeSlider',
                    files: [
                        '../../../dependencies/plugins/ion-slider/css/ion.rangeSlider.css',
                        '../../../dependencies/plugins/ion-slider/css/ion.rangeSlider.skinFlat.css',
                        '../../../dependencies/plugins/ion-slider/js/ion.rangeSlider.min.js'
                    ]
                }, {
                    name: 'navTree',
                    files: [
                        '../../../dependencies/plugins/angular-bootstrap-nav-tree/abn_tree_directive.js',
                        '../../../dependencies/plugins/angular-bootstrap-nav-tree/abn_tree.css'
                    ]
                }, {
                    name: 'nestable',
                    files: [
                        '../../../dependencies/plugins/jquery-nestable/jquery.nestable.css',
                        '../../../dependencies/plugins/jquery-nestable/jquery.nestable.js',
                        '../../../dependencies/plugins/angular-nestable/angular-nestable.js'
                    ]
                }, {
                    //https://github.com/angular-ui/ui-select
                    name: 'select',
                    files: [
                        '../../../dependencies/plugins/bootstrap-select2/select2.css',
                        '../../../dependencies/plugins/angular-ui-select/select.min.css',
                        '../../../dependencies/plugins/angular-ui-select/select.min.js'
                    ]
                }, {
                    name: 'datepicker',
                    files: [
                        '../../../dependencies/plugins/bootstrap-datepicker/css/datepicker3.css',
                        '../../../dependencies/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
                    ]
                }, {
                    name: 'daterangepicker',
                    files: [
                        '../../../dependencies/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css',
                        '../../../dependencies/plugins/bootstrap-daterangepicker/daterangepicker.js'
                    ]
                }, {
                    name: 'timepicker',
                    files: [
                        '../../../dependencies/plugins/bootstrap-timepicker/bootstrap-timepicker.min.css',
                        '../../../dependencies/plugins/bootstrap-timepicker/bootstrap-timepicker.min.js'
                    ]
                }, {
                    name: 'inputMask',
                    files: [
                        '../../../dependencies/plugins/jquery-inputmask/jquery.inputmask.min.js'
                    ]
                }, {
                    name: 'autonumeric',
                    files: [
                        '../../../dependencies/plugins/jquery-autonumeric/autoNumeric.js'
                    ]
                }, {
                    name: 'summernote',
                    files: [
                        '../../../dependencies/plugins/summernote/css/summernote.css',
                        '../../../dependencies/plugins/summernote/js/summernote.min.js',
                        '../../../dependencies/plugins/angular-summernote/angular-summernote.min.js'
                    ],
                    serie: true // load in the exact order
                }, {
                    name: 'tagsInput',
                    files: [
                        '../../../dependencies/plugins/bootstrap-tag/bootstrap-tagsinput.css',
                        '../../../dependencies/plugins/bootstrap-tag/bootstrap-tagsinput.min.js'
                    ]
                }, {
                    name: 'dropzone',
                    files: [
                        '../../../dependencies/plugins/dropzone/css/dropzone.css',
                        '../../../dependencies/plugins/dropzone/dropzone.min.js',
                        '../../../dependencies/plugins/angular-dropzone/angular-dropzone.js'
                    ]
                }, {
                    name: 'wizard',
                    files: [
                        '../../../dependencies/plugins/lodash/lodash.min.js',
                        '../../../dependencies/plugins/angular-wizard/angular-wizard.min.css',
                        '../../../dependencies/plugins/angular-wizard/angular-wizard.min.js'
                    ]
                }, {
                    name: 'dataTables',
                    files: [
                        '../../../dependencies/plugins/jquery-datatable/media/css/jquery.dataTables.css',
                        '../../../dependencies/plugins/jquery-datatable/extensions/FixedColumns/css/dataTables.fixedColumns.min.css',
                        '../../../dependencies/plugins/datatables-responsive/css/datatables.responsive.css',
                        '../../../dependencies/plugins/jquery-datatable/media/js/jquery.dataTables.min.js',
                        '../../../dependencies/plugins/jquery-datatable/extensions/TableTools/js/dataTables.tableTools.min.js',
                        '../../../dependencies/plugins/jquery-datatable/extensions/Bootstrap/jquery-datatable-bootstrap.js',
                        '../../../dependencies/plugins/datatables-responsive/js/datatables.responsive.js',
                        '../../../dependencies/plugins/datatables-responsive/js/lodash.min.js'
                    ],
                    serie: true // load in the exact order
                }, {
                    name: 'google-map',
                    files: [
                        '../../../dependencies/plugins/angular-google-map-loader/google-map-loader.js',
                        '../../../dependencies/plugins/angular-google-map-loader/google-maps.js'
                    ]
                }

            ]
        });
    }]);