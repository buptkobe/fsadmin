'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:UserlistCtrl
 * @description
 * # UserlistCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ActivityCreateCtrl', function ($scope, ActivityFactory, $state, toastr) {
        var vm = $scope.vm = {
            show_error: false,
            show_type: 3,
            item: {
                iscurr : 1
            }
        };


        vm.submit = function (basic_form) {
            vm.show_error = true;
            basic_form.$setDirty();
            if(basic_form.$valid){
                ActivityFactory.create(vm.item, function() {
                	toastr.success('保存成功!');
                	$state.go('dashboard.activitylist');
                });
            }
        };

        vm.change_show_type = function (form) {
            if (vm.show_type == 2) {
                vm.show_error = true;
            } else {
                vm.show_error = false;
            }

            // 重置表单
            vm.item = {};
            form.$setPristine();

        }
    });