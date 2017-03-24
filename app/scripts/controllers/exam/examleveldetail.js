"use strict";
angular.module("sbAdminApp").controller("ExamLevelDetailCtrl", function($scope, $stateParams, LevelFactory, $state, toastr) {
    var vm = $scope.vm = {
        show_error: false,
        show_type: 3,
        item: {}
    };
    LevelFactory.show({
        id: $stateParams.id
    }, function(response) {
        vm.item = response
    });
    $scope.update = function(basic_form) {
        vm.show_error = true;
        basic_form.$setDirty();
        if (basic_form.$valid) {
            LevelFactory.update({
                id: $stateParams.id
            }, vm.item, function() {
                $state.go("dashboard.examlevellist");
            });
        }
    };
    $scope.cancel = function() {
        $state.go("dashboard.examlevellist");
    }
});