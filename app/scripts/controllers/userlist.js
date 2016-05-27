'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:UserlistCtrl
 * @description
 * # UserlistCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('UserlistCtrl', function ($scope, UsersFactory, UserFactory, $state, toastr) {
       var vm = $scope.vm = {};
          vm.page = {
            size: 5,
            index: 1
          };
        vm.items = UsersFactory.query();
        // callback for 'deleteStudent':
        $scope.deleteUser = function (item) {
            UserFactory.delete({ id: item.openid});
            vm.items = UsersFactory.query();
            $('#myModal').modal('hide');
            toastr.success('success!');
        };

        $scope.confirm = function(item) {
            vm.item = item;
            $('#myModal').modal('show');
        }

        // callback for 'editStudent':
        $scope.editUser = function (userId) {
            //$location.path('/studentdetail/' + studentId);
            $state.go('dashboard.userdetail', {id : userId});
        };

        // callback for 'createStudent':
        $scope.refresh = function () {
           vm.items = UsersFactory.query();
        };

         
          
    });