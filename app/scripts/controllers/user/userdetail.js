'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('UserDetailCtrl',function ($scope, $stateParams, UserFactory, $state,toastr) {
      var vm = $scope.vm = {
            show_error: false,
            show_type: 3,
            user: {},
            hasUser: false
        };

  		UserFactory.show({id: $stateParams.id}, function(response){
          vm.user = response;
      });

        vm.submit = function (basic_form) {
            vm.show_error = true;
            basic_form.$setDirty();
            if(basic_form.$valid){
                UserFactory.update({id: $stateParams.id},vm.user,function() {
                  toastr.success('保存成功!');
                  vm.hasUser = true;
                });
            }
        };
        
        $scope.cancel = function() {
          $state.go('dashboard.userlist');
        }
    });
