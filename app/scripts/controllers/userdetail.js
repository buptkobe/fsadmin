'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('UserDetailCtrl',['$scope', '$stateParams', 'UserFactory', '$state',
  	function ($scope, $stateParams, UserFactory, $state) {

  		$scope.item = UserFactory.show({id: $stateParams.id});

        // callback for'updateStudent':
        $scope.updateUser = function () {
            UserFactory.update({id: $stateParams.id}, $scope.item, function(){
            	$state.go('dashboard.userlist');
            });
            
        };

        // callback 'cancel':
        $scope.cancel = function () {
            $state.go('dashboard.userlist');
        };
        
    }]);
