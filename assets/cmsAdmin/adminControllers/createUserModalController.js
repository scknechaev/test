adminApp
    .controller('createUserModalController', ['$scope', 'userService', 'ngNotify',function ($scope, userService, ngNotify) {
    initScope($scope.user);

    $scope.createOrEditUser = function () {
        var user          = $scope.newUser,
            validateAttrs = [
                'name',
                'email',
                'password'
            ];

        userService.emailToLowerCase(user);

        if (!isSavingAvailable(user, $scope, validateAttrs)) { // validation
            return;                                            
        }                                                      

        if (user.id != null) {                                 // edit or created user
            editUser(userService, user, $scope);
        } else {
            createUser(userService, user, $scope);
        }
    };

    $scope.closeAlert = function () {
        $scope.alert = false;
    }

    /*$scope.createUser = function () {
        var userToCreate = {
            name: $scope.newUser.name,
            email: $scope.newUser.email,
            password: $scope.newUser.password,
            role: $scope.newUser.role
        };

        return $http.post('/api/createUser', userToCreate).then(function (data) {
            $scope.creationSuccess = true;
            users.push(data.data);
            $('.bs-example-modal-lg').modal('hide');
            ngNotify.set('User has been Created', {
                  position: 'top',
                  theme: 'pure',
                  type: 'success',
                  sticky: false,
                  duration: 2500
            });
        },  function (err) {
            $scope.creationFail = true;
        });
    };*/

    function initScope (userToEdit) {
        $scope.$parent.navModal = $scope;
        $scope.roleTypes = [{
            name: 'Модератор',
            type: 1
        }, {
            name: 'Администратор',
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
            userService.showAlert($scope, 'Пожалуйста, заполните все необходимые поля!', 'warning');
            return false;
        }

        return true;
    }

    function editUser (service, user, $scope) {
        service.editUser(user).then(function (result) {
            service.copyUser($scope.user, user);
            $('.bs-example-modal-lg').modal('hide');
            ngNotify.set('Пользователь изменен', {
                  position: 'top',
                  theme: 'pure',
                  type: 'success',
                  sticky: false,
                  duration: 2500
            });
        }, function (error) {
            service.showAlert($scope, 'Ошибка при попытке редактирования пользователя', 'warning');
        });
    }

    function createUser (service, user, $scope) {
        service.createUser(user).then(function (data) {
            $scope.$parent.users.push(data.user);
            $('.bs-example-modal-lg').modal('hide');
            ngNotify.set('Пользователь добавлен', {
                  position: 'top',
                  theme: 'pure',
                  type: 'success',
                  sticky: false,
                  duration: 2500
            });
            //service.showAlert($scope, 'User successfully created', 'success');
        }, function (error) {
            service.showAlert($scope, 'Ошибка при попытке создания пользователя', 'warning');
        });
    }
}]);