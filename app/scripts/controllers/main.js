'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('MainCtrl', function($scope,$state) {
  	$scope.logout = function() {
  		store.delete('jwt');
  		$state.go('login');
  	}
  });
