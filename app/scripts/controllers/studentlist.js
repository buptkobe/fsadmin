'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('StudentlistCtrl', ['$scope', 'StudentsFactory', 'StudentFactory', '$state', function ($scope, StudentsFactory, StudentFactory, $state) {
        
        // callback for 'editStudent':
        $scope.editStudent = function (studentId) {
            //$location.path('/studentdetail/' + studentId);
            $state.go('dashboard.studentdetail', {id : studentId});
        };

        // callback for 'deleteStudent':
        $scope.deleteStudent = function (studentId) {
            StudentFactory.delete({ id: studentId });
            $scope.students = StudentsFactory.query();
        };

        // callback for 'createStudent':
        $scope.createStudent = function () {
            $state.go('studentcreation');
        };

        $scope.students = StudentsFactory.query();
    }]);
