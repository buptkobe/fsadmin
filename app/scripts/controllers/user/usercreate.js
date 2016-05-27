'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:UserlistCtrl
 * @description
 * # UserlistCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('UserCreateCtrl', function ($scope, UsersFactory,UserFactory, $state, toastr,$location) {
        var vm = $scope.vm = {
            show_error: false,
            show_type: 3,
            user: {},
            hasUser: false
        };

        UserFactory.getbycode({code:$location.search().code}, function(response){
            vm.user = response;
            if (!vm.user.name) {
                vm.user.sex = 1;
                vm.title = '用户新增';
            } else {
                vm.hasUser = true;
                vm.title = '用户信息';
            }
        });

        vm.submit = function (basic_form) {
            vm.show_error = true;
            basic_form.$setDirty();
            if(basic_form.$valid){
                UsersFactory.create(vm.user, function() {
                	toastr.success('保存成功!');
                	vm.hasUser = true;
                	vm.title = '用户信息';
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
            vm.user = {};
            form.$setPristine();

        }
    });