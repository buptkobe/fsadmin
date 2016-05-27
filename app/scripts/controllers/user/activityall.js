'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:UserlistCtrl
 * @description
 * # UserlistCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ActivityAllCtrl', function ($scope, ActivityFactory,UserFactory, $location, $stateParams) {
       	var vm = $scope.vm = {};
      	vm.page = {
	        size: 15,
	        index: 1
      	};
      	vm.loadBtnHide = false;
        
        if ($stateParams.openid) {
            ActivityFactory.listbyuser({openid : $stateParams.openid}, function(response) {
                vm.items = response;
                if (vm.page.index * vm.page.size >= vm.items.length) {
                  vm.loadBtnHide = true;
                }
            });
        } else {
          	UserFactory.getbycode({code:$location.search().code}, function(response){
                vm.user = response;
                ActivityFactory.listbyuser(vm.user, function(response) {
      	         	vm.items = response;
      	         	if (vm.page.index * vm.page.size >= vm.items.length) {
      	        		vm.loadBtnHide = true;
      	        	}
      	        });
            });
        }
        /*vm.user = {openid:123};
        ActivityFactory.listbyuser(vm.user, function(response) {
         	vm.items = response;
         	if (vm.page.index * vm.page.size >= vm.items.length) {
        		vm.loadBtnHide = true;
        	}
        });*/
        
        $scope.loadmore = function () {
        	vm.page.index++;
        	if (vm.page.index * vm.page.size >= vm.items.length) {
        		vm.loadBtnHide = true;
        	}
        }
    });