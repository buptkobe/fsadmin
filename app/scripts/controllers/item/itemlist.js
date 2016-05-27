'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:UserlistCtrl
 * @description
 * # UserlistCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ItemListCtrl', function ($scope, ItemFactory, $state, toastr) {
       var vm = $scope.vm = {};
          vm.page = {
            size: 20,
            index: 1
          };
        vm.items = ItemFactory.query();
        // callback for 'deleteStudent':
        $scope.delete = function (item) {
            ItemFactory.delete({ id: item.id},function(){
                vm.items = ItemFactory.query();
                $('#myModal').modal('hide');
                toastr.success('success!');
            });
            
        };

        $scope.confirm = function(item) {
            vm.item = item;
            $('#myModal').modal('show');
        }

        // callback for 'editStudent':
        $scope.edit = function (id) {
            //$location.path('/studentdetail/' + studentId);
            $state.go('dashboard.itemdetail', {id : id});
        };

        // callback for 'createStudent':
        $scope.refresh = function () {
           vm.items = ItemFactory.query();
        };

        $scope.insert = function () {
           $state.go('dashboard.itemcreate');
        };
          
    });