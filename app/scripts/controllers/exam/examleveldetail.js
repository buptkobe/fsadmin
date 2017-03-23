"use strict";
angular.module("sbAdminApp").controller("ExamLevelDetailCtrl", function($scope, $stateParams, LevelFactory, $state, toastr) {
    var vm = $scope.vm = {
        show_error: !1,
        show_type: 3,
        item: {}
    };
    LevelFactory.show({
        id: $stateParams.id
    }, function(response) {
        vm.item = response
    }), $scope.update = function(basic_form) {
        vm.show_error = !0, basic_form.$setDirty(), basic_form.$valid && LevelFactory.update({
            id: $stateParams.id
        }, vm.item, function() {
            $state.go("dashboard.examlevellist")
        })
    }, $scope.cancel = function() {
        $state.go("dashboard.examlevellist")
    }
});