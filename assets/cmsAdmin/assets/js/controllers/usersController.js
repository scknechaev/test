  angular.module('app')
      .controller('usersController', ['$scope', '$http', '$modal', 'userService', 'ngNotify', '$timeout',
        function ($scope, $http, $modal, userService, ngNotify, $timeout) {
          $scope.Form = {};
          $scope.users = [];
          var usersTable;
          var tableOptions = {
            "sDom":"t",
            "sPaginationType":"bootstrap",
            "destroy":true,
            "paging":false,
            "scrollCollapse":true
          }
          getUsers();

          $scope.setModalState = function (editUser) {
            $scope.Form.UserManagement.mail.$setPristine();
            $scope.Form.UserManagement.name.$setPristine();
            $scope.Form.UserManagement.password.$setPristine();
            $scope.Form.UserManagement.mail.$setUntouched();
            $scope.Form.UserManagement.name.$setUntouched();
            $scope.Form.UserManagement.password.$setUntouched();
            $scope.user      = editUser;
            $scope.isEditing = editUser ? true : false;

            if (editUser) {
              $scope.newUser = Object.create(editUser);
              $scope.newUser.password = '';
            } else {
              $scope.newUser = {
                email:'',
                name:'',
                password:'',
                role: 1
              };
            }

            resetModalState($scope.navModal);
          };

          function resetModalState (modalWindow) {
              modalWindow.alert = false;
          }

          function resetWarnings (warnObj) {
            for (var key in warnObj) {
              warnObj[key] = '';
            }
          }

          function getUsers () {
              userService.getUsers().then(function (users) {
                  $scope.users = users;
                  $timeout(function(){
                    usersTable = $('#users-table').DataTable(tableOptions);
                  },100);
              }, function (error) {
                console.log('There are some error while requesting data');
                console.log(error);
              })
          };

          

          $scope.openConfirmDelUser = function (user, index, $event) {
            $modal.open({
                resolve:{
                  user: function(){
                    return user;
                  },
                  users: function(){
                    return $scope.users;
                  },
                  index: function(){
                    return index;
                  },
                  target: function(){
                    return $event.target;
                  }
                },
                templateUrl: 'cmsAdmin/tpl/modals/confirmDelUser.html.tmpl',
                controller: ['$scope', '$modalInstance', 'user', 'users', 'pageService', 'index', 'target',
                  function($scope, $modalInstance, user, users, pageService, index, target) {
                    $scope.index = index;
                    $scope.user =  user;
                    $scope.users =  users;
                    $scope.delUser = function (user, index)  {
                        var usersTable = $('#users-table');
                        console.log(arguments);
                        userService.delUser(user).then(function (deletedUser) {
                          if(deletedUser.status && deletedUser.statusText && deletedUser.status !== 200){
                              ngNotify.set('Error during user deliting', {
                                    position: 'top',
                                    theme: 'pure',
                                    type: 'error',
                                    sticky: false,
                                    duration: 2500
                              });
                          } else {
                              usersTable.dataTable().fnDestroy();
                              $scope.users.splice(index, 1);
                              ngNotify.set('User has been deleted', {
                                    position: 'top',
                                    theme: 'pure',
                                    type: 'success',
                                    sticky: false,
                                    duration: 2500
                              });
                              $timeout(function(){
                                usersTable.DataTable(tableOptions);
                              },100);
                          }
                        });
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    setTimeout(function(){
                        // $('.modal-footer .btn.btn-danger').focus();
                    },200);
                }]
            });
          };


          $scope.editUser = function editUser (user) {
              userService.editUser(user).then(function (editedUser) {

              })
          }

      }]);
