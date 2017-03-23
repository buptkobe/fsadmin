"use strict";
angular.module("sbAdminApp").controller("ExamLevelListCtrl", function($scope, LevelFactory, $state, toastr) {
    var vm = $scope.vm = {};
    vm.page = {
        size: 20,
        index: 1
    }, vm.items = LevelFactory.query(), $scope["delete"] = function(item) {
        LevelFactory["delete"]({
            id: item.id
        }, function() {
            vm.items = LevelFactory.query(), $("#myModal").modal("hide"), toastr.success("删除成功!")
        })
    }, $scope.confirm = function(item) {
        vm.item = item, $("#myModal").modal("show")
    }, $scope.edit = function(id) {
        console.log(id), $state.go("dashboard.examleveldetail", {
            id: id
        })
    }, $scope.refresh = function() {
        vm.items = LevelFactory.query()
    }, $scope.insert = function() {
        $state.go("dashboard.examlevelcreate")
    }
});