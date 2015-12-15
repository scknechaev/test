angular.module('app').factory('userService', ['$http', 'baseService', function ($http, baseService) {

    /**
     * Conctructor, for creating of service used in users controller
     */
    function UserService () {

    }

    UserService.prototype = Object.create(baseService); // extneds from base Service

    /**
     * Requesting all list of users that is in DB
     */
    UserService.prototype.getUsers = function () {
        return this.request('get', '/users');
    };

    /**
     * Creating new user and write it to DB
     */
    UserService.prototype.createUser = function (user) {
        return this.request('post', '/admin/createuser', user);
    };

    /**
     * Deleting user and delete it from DB
     */
    UserService.prototype.delUser = function (user) {
        return this.request('delete', 'admin/deleteuser/' + user.id);
    };

    /**
     * Edit user and save it to DB
     */
    UserService.prototype.editUser = function (user) {
        return this.request('put', 'admin/updateuser/' + user.id, user);
    };

    return new UserService;
}]);
