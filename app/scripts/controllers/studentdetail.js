'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('StudentDetailCtrl',['$scope', '$stateParams', 'StudentFactory', '$location',
  	function ($scope, $stateParams, StudentFactory, $location) {

        // callback for'updateStudent':
        $scope.updateStudent = function () {
            StudentFactory.update($scope.student);
            $location.path('/studentlist');
        };

        // callback 'cancel':
        $scope.cancel = function () {
            $location.path('/studentlist');
        };
        
        $scope.student = StudentFactory.show({id: $stateParams.id});
    }]);
