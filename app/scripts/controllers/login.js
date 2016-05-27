'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('LoginCtrl', function($scope, $http, store, $state, baseUrl, toastr) {
  	$scope.user = {};

	$scope.login = function() {
	    $http({
	      url: baseUrl + 'pt/service?formid=common_fit_session&pt_control_action=create',
	      method: 'POST',
	      data: $scope.user
	    }).then(function(response) {
	    	if(response.data.id_token) {
			    store.set('jwt', response.data.id_token);
			    store.set('username', $scope.user.username);
			    $state.go('dashboard.userlist');
	        } else {
	        	toastr.error('用户名密码不正确');
	        }  
	    }, function(error) {
	      alert(error.data);
	    });
	}  
  });
