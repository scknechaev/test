adminApp.controller('navModalController', [
        '$scope',
        'navigationService', 
        'pageService',
        '$http',
        'ngNotify',
    function ($scope, navService, pageService, $http, ngNotify) {
        initScope($scope);
        getPages();
        getNavs();

        $scope.closeAlert = function (isShowing) {
            $scope.alert = false;
        };

        $scope.createOrEditNav = function () {
            var navToSend = {
                    'name': $scope.navCopy.name,
                    'orientation': $scope.navCopy.orientation
                },
                navToEdit = $scope.navCopy;

            initSendingNavigation(navToEdit, navToSend);

            if (navToEdit.id) {
                navToSend.id = navToEdit.id;
                editNavigation(navService, navToSend, $scope, navToEdit);
            } else {
                createNavigation(navService, navToSend, $scope);
            }
        };

        $scope.$watch('nav.page', function (newVal, oldVal) {
            if ($scope.nav.navtype === 1) {
                $scope.nav.href = '';
            } else if ($scope.nav.navtype === 2) {

            }
        });

        function initSendingNavigation (editNav, sendNav) {

            if (editNav.navtype === 1) {
                sendNav.page = editNav.page;
                sendNav.href = '';
            } else if (editNav.navtype === 2) {
                sendNav.page = null;
                sendNav.href = editNav.href;
            }

            sendNav.navtype = editNav.navtype;
        }

        function initScope ($scope) {
            $scope.$parent.navModal  = $scope;
            $scope.form              = {};
            $scope.nav               = {};
            $scope.pages             = [];
            $scope.typeOpt           = [
                {name: 'internal', type: 1},
                {name: 'external', type: 2}
            ];
            $scope.orientOpt = [
                {name: 'horizontal', orientation: 1},
                {name: 'vertical', orientation: 2}
            ];
        }

        function getNavs (isInModal) {
            navService.getNavs().then(function (navs) {

                if (isInModal) {
                    $scope.$parent.navs = navs;
                } else {
                    $scope.navs = navs;
                }
                
            }, function (err) {
                console.log(err);
            });
        }
        
        function getPages () {
            pageService.getPages().then(function (data) {
                $scope.pages = data;
            }, function (err) {
                console.log(err);
            })
        }

        function editNavigation (service, navigation, $scope, navToEdit) {
            service.editNav(navigation).then(function (data) {
                service.showAlert($scope, 'Form successfully edited', 'success');
                navService.copyUser($scope.$parent.nav, data);
                $('.modal').modal('hide');
                ngNotify.set('Вкладка успешно сохранена', {
                      position: 'top',
                      theme: 'pure',
                      type: 'success',
                      sticky: false,
                      duration: 2500
                });
            }, function (err) {
                service.showAlert($scope, 'Form editing failed', 'warning');
            });
        }

        function createNavigation (service, navigation, $scope) {
            service.createNav(navigation).then(function (data) {
                service.showAlert($scope, 'Form successfully edited', 'success');
                // $scope.$parent.navs.push(data);
                getNavs(true);
                $('.modal').modal('hide');
                ngNotify.set('Вкладка успешно создана', {
                      position: 'top',
                      theme: 'pure',
                      type: 'success',
                      sticky: false,
                      duration: 2500
                });
            }, function (err) {
                service.showAlert($scope, 'Failed to edit navigation', 'warning');
            });
        }

        function typeIsExternal (type) {

            if (type === 1) {
                $scope.nav.url = null;
            } else if (type === 2) {
                $scope.nav.page = null;
            }
            $scope.nav.page = null;
        }
    }
]);
