  angular.module('app')
      .controller('usersController', ['$scope', '$http', '$modal', 'userService', 'ngNotify',
        function ($scope, $http, $modal, userService, ngNotify) {
          $scope.Form = {};
          $scope.users = [];
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
              }, function (error) {
                console.log('There are some error while requesting data');
                console.log(error);
              })
          };

          

          $scope.openConfirmDelUser = function (user, index) {
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
                  }
                },
                templateUrl: 'cmsAdmin/tpl/modals/confirmDelUser.html.tmpl',
                controller: ['$scope', '$modalInstance', 'user', 'users', 'pageService', 'index',
                  function($scope, $modalInstance, user, users, pageService, index) {
                    $scope.index = index;
                    $scope.user =  user;
                    $scope.users =  users;
                    $scope.delUser = function (user, index)  {
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
                              ngNotify.set('User has been deleted', {
                                    position: 'top',
                                    theme: 'pure',
                                    type: 'success',
                                    sticky: false,
                                    duration: 2500
                              });
                              $scope.users.splice(index, 1);
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
