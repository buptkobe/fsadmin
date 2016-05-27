'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('headerNotification',function(){
		return {
	        templateUrl:'scripts/directives/header/header-notification/header-notification.html',
	        restrict: 'E',
	        replace: true,
	        scope: {
      		},
	        controller:function($scope,store,$state){
	        	$scope.logout = function() {
	        		store.remove('jwt');
	        		store.remove('username');
	        		$state.go('login');
	        	};

	        	$scope.username = store.get('username');
	        }
    	}
	});


