'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ActivityDetailCtrl',
  	function ($scope, $stateParams, ActivityFactory, $state) {
  		  var vm = $scope.vm = {
            show_error: false,
            show_type: 3,
            item: {}
        };

  		  ActivityFactory.show({id: $stateParams.id}, function(response){
            vm.item = response;
  		  });
  		

        // callback for'updateStudent':
        $scope.update = function (basic_form) {
        	vm.show_error = true;
            basic_form.$setDirty();
            if(basic_form.$valid){
	            ActivityFactory.update({id: $stateParams.id}, vm.item, function(){
	            	$state.go('dashboard.activitylist');
	            });
            }
        };

        // callback 'cancel':
        $scope.cancel = function () {
            $state.go('dashboard.activitylist');
        };
        
    });
