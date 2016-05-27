'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:UserlistCtrl
 * @description
 * # UserlistCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('SysuserListCtrl', function ($scope, SysuserFactory, $state, toastr) {
        var vm = $scope.vm = {};
        vm.page = {
            size: 20,
            index: 1
        };
        SysuserFactory.query([],function(response){
            vm.items = response;
        });
        // callback for 'deleteStudent':
        $scope.deleteUser = function (item) {
            SysuserFactory.delete({ id: item.id},function(){
            	vm.items = SysuserFactory.query();
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
            $state.go('dashboard.sysuserdetail', {id : userId});
        };

        // callback for 'createStudent':
        $scope.refresh = function () {
           vm.items = SysuserFactory.query();
        };

        $scope.insert = function () {
           $state.go('dashboard.sysusercreate');
        }; 
          
    });