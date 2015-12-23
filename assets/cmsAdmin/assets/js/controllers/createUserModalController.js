angular.module('app')
    .controller('createUserModalController', ['$scope', 'userService', 'ngNotify', '$timeout',
      function ($scope, userService, ngNotify, $timeout) {
    initScope($scope.user);
    var usersTable = $('#users-table');
    var tableOptions = {
        "sDom":"t",
        "sPaginationType":"bootstrap",
        "destroy":true,
        "paging":false,
        "scrollCollapse":true
      }
    $scope.createOrEditUser = function () {
        var user          = $scope.newUser,
            validateAttrs = [];
        userService.emailToLowerCase(user);
        

        if (!isSavingAvailable(user, $scope, validateAttrs)) { // validation
            return;                                            
        }                                                      

        if (user.id != null) {   
            validateAttrs = [
                'name',
                'email'
            ];                              // edit or created user
            editUser(userService, user, $scope);
        } else {
            validateAttrs = [
                'name',
                'email',
                'password'
            ];
            createUser(userService, user, $scope);
        }
    };

    $scope.closeAlert = function () {
        $scope.alert = false;
    }

    function initScope (userToEdit) {
        $scope.$parent.navModal = $scope;
        $scope.roleTypes = [{
            name: 'Moderator',
            type: 1
        }, {
            name: 'Admin',
            type: 2}
        ];
        $scope.validate = {
            email: '',
            password: '',
            name: ''
        };
    }

    function isSavingAvailable (user, $scope, validateAttrs) {

        if (!userService.isValidateOk(user, $scope, validateAttrs)) {  
            userService.showAlert($scope, 'Please fill all required fields!', 'warning');
            return false;
        }

        return true;
    }

    function editUser (service, user, $scope) {
        service.editUser(user).then(function (result) {
            $('.bs-example-modal-lg').modal('hide');
            if(result.status && result.statusText && result.status !== 200){
                ngNotify.set('Error during user editing', {
                      position: 'top',
                      theme: 'pure',
                      type: 'error',
                      sticky: false,
                      duration: 2500
                });
            } else {
                usersTable.dataTable().fnDestroy();
                service.copyUser($scope.user, user);
                ngNotify.set('User has been changed', {
                      position: 'top',
                      theme: 'pure',
                      type: 'success',
                      sticky: false,
                      duration: 2500
                });
                $timeout(function() {
                  usersTable.DataTable(tableOptions);
                }, 100);
            }
            
        });
    }

    function createUser (service, user, $scope) {
        service.createUser(user).then(function (result) {
            $('.bs-example-modal-lg').modal('hide');
            if(result.status && result.statusText && result.status !== 200){
                ngNotify.set('Error during user creation', {
                      position: 'top',
                      theme: 'pure',
                      type: 'error',
                      sticky: false,
                      duration: 2500
                });
            } else {
                usersTable.dataTable().fnDestroy();
                $scope.$parent.users.push(result.user);
                ngNotify.set('User has been added', {
                      position: 'top',
                      theme: 'pure',
                      type: 'success',
                      sticky: false,
                      duration: 2500
                });
                $timeout(function() {
                  usersTable.DataTable(tableOptions);
                }, 100);
            }
        });
    }
}]);