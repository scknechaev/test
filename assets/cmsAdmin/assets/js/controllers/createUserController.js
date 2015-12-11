angular.module('app')
  .controller('createUserController', ['$scope', 'ngDialog', '$http', 'ngNotify',
   function ($scope, ngDialog, $http, ngNotify) {
      $scope.roleTypes = [{
          name: 'Moderator',
          type: 1
      }, {
        name: 'Admin',
        type: 2}];
      /**
       * methods for an administrator creating a user
       * @type {createUser}
       */
      $scope.createUser = createUser;

      function createUser () {
        var userToCreate = {
          name: $scope.newUser.name,
          email: $scope.newUser.email,
          password: $scope.newUser.password,
          role: $scope.newUser.role
      };

        return $http.post('/api/createUser', userToCreate).then(function (data) {
          $scope.creationSuccess = true;
      },  function (err) {
          $scope.creationFail = true;
      });
    };
  }
]);
