"use strict";
angular.module("sbAdminApp").controller("ExamLevelCreateCtrl", function($scope, LevelFactory, $state, toastr) {
    var vm = $scope.vm = {
        show_error: !1,
        show_type: 3,
        item: {}
    };
    vm.submit = function(basic_form) {
        vm.show_error = !0, basic_form.$setDirty(), basic_form.$valid && LevelFactory.create(vm.item, function() {
            toastr.success("保存成功!"), $state.go("dashboard.examlevellist")
        })
    }, vm.change_show_type = function(form) {
        2 == vm.show_type ? vm.show_error = !0 : vm.show_error = !1, vm.item = {}, form.$setPristine()
    }
});