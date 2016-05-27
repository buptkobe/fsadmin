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
            size: 20,
            index: 1
        };
        UsersFactory.query([], function(response) {
            vm.items = response;
        });
        // callback for 'deleteStudent':
        $scope.deleteUser = function (item) {
            UserFactory.delete({ id: item.openid},function(){
                vm.items = UsersFactory.query();
                $('#myModal').modal('hide');
                toastr.success('success!');
            });
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
            UsersFactory.query([], function(response) {
                vm.items = response;
            });
        };

         
          
    });