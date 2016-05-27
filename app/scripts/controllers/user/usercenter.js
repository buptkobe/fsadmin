'use strict';

angular.module('sbAdminApp')
	.controller('UserCenterCtrl', function ($scope, ActivityFactory,UserFactory, $location) {
       	var vm = $scope.vm = {};
       	vm.activeTab = 1;
       	vm.hasUser = true;
       	
       	UserFactory.getbycode({code:$location.search().code}, function(response){
            vm.user = response;
            ActivityFactory.listbyapply(vm.user, function(response) {
	         	vm.items = response;
	        });
        });

       	vm.showTab = function (i) {
       		vm.activeTab = i;
       	}
    });