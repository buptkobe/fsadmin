'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:UserlistCtrl
 * @description
 * # UserlistCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ActivityListCtrl', function ($scope, ActivityFactory, $state, toastr) {
       var vm = $scope.vm = {};
          vm.page = {
            size: 20,
            index: 1
          };
        vm.items = ActivityFactory.query();
        // callback for 'deleteStudent':
        $scope.delete = function (item) {
            ActivityFactory.delete({ id: item.id},function(){
                vm.items = ActivityFactory.query();
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
            $state.go('dashboard.activitydetail', {id : id});
        };

        // callback for 'createStudent':
        $scope.refresh = function () {
           vm.items = ActivityFactory.query();
        };

        $scope.insert = function () {
           $state.go('dashboard.activitycreate');
        };
          
    });