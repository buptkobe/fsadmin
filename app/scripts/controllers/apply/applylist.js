'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:UserlistCtrl
 * @description
 * # UserlistCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ApplyListCtrl', function ($scope, ActivityFactory,ApplyFactory, $state, toastr) {
        var vm = $scope.vm = {};
        vm.page = {
            size: 20,
            index: 1
        };

        ActivityFactory.query([], function(response){
            vm.activities = response;
            vm.activity = response[0].id;
            ApplyFactory.query({activity:vm.activity}, function(response) {
                vm.items = response;
            });
        });

        
        // callback for 'deleteStudent':
        $scope.delete = function (item) {
            ApplyFactory.delete({ id: item.id},function(){
            	vm.items = ApplyFactory.query();
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
           vm.items = ApplyFactory.query();
        };

        $scope.insert = function () {
           $state.go('dashboard.itemcreate');
        };
          
        $scope.change = function() {
            ApplyFactory.query({activity:vm.activity}, function(response){
                vm.items = response;
            });
       }
    });