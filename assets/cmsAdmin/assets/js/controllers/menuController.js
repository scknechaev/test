angular.module('app')
  .controller('menuController', [
    '$scope',
    'navigationService',
    '$modal',
    'pageService',
    'ngNotify',
    function ($scope, navigationService, $modal, pageService, ngNotify) {
        // $scope.pageUrl = navigationService.getUrl();
        $scope.navs = [];
        // $scope.Form = {};
        $scope.remove = function (scope) {
          scope.remove();
        };

        $scope.toggle = function (scope) {
          scope.toggle();
        };

        $scope.newSubItem = function (scope) {
          var nodeData = scope.$modelValue;
          nodeData.nodes.push({
            id: nodeData.id * 10 + nodeData.nodes.length,
            title: nodeData.title + '.' + (nodeData.nodes.length + 1),
            nodes: []
          });
        };
        $scope.getNodes = function () {
            navigationService.getNavs().then(function (navs) {
                if(navs){
                    $scope.navs = navs.navs;
                } else {
                    $scope.navs = [];
                }
                console.log(navs);
            }, function (err) {
                console.log(err);
            });
        }
        $scope.getPages = function () {
            pageService.getPages().then(function (data) {
                $scope.pages = data;
            }, function (err) {
                console.log(err);
            })
        }
        $scope.getNodes();
        $scope.getPages();

        $scope.createNode = function(){
          $scope.navs.push(
            {
              "title": "",
              "nodes": []
            }
          )
        }

        $scope.setUrl = function(id){
            if(id === undefined){
                return
            }
            for (var i = 0; i < $scope.pages.length; i++) {
                if($scope.pages[i].id === id){
                    return $scope.pages[i].url;
                }
            };
        }

        $scope.saveChanges = function(){
            $scope.navs = removeThirdLevelNav($scope.navs);
            if(menuValidation($scope.navs)){
                navigationService.editNav($scope.navs)
                    .then(function(res){
                        $scope.navs = res[0].navs;
                        ngNotify.set('Menu has been successfully updated', {
                              position: 'top',
                              theme: 'pure',
                              type: 'success',
                              sticky: false,
                              duration: 2500
                        });
                })
            } else {
                ngNotify.set('Validation error. Some of menu items has no title', {
                      position: 'top',
                      theme: 'pure',
                      type: 'error',
                      sticky: false,
                      duration: 2500
                });
            }
        }

        function menuValidation(menu){
            for (var i = 0; i < menu.length; i++) {
                if(!menu[i].title){
                    return false;
                }
                for (var j = 0; j < menu[i].nodes.length; j++) {
                    if(!menu[i].nodes[j].title) {
                        return false;
                    }
                };
            };
            return true;
        }

        function removeThirdLevelNav(navs){
            for (var i = 0; i < navs.length; i++) {
                for (var j = 0; j < navs[i].nodes.length; j++) {
                    navs[i].nodes[j].nodes = [];
                };
            };
            return navs;
        }


        
}]);


