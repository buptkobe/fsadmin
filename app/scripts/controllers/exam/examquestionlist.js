"use strict";
angular.module("sbAdminApp").controller("ExamQuestionListCtrl", function($scope, ExamQuestionFactory, $state, toastr) {
    var vm = $scope.vm = {};
    vm.page = {
        size: 20,
        index: 1
    };
    vm.items = ExamQuestionFactory.query();
    $scope.delete = function(item) {
        ExamQuestionFactory.delete({
            id: item.id,
            itype : item.itype
        }, function() {
            vm.items = ExamQuestionFactory.query();
            $("#myModal").modal("hide");
            toastr.success("删除成功!")
        });
    };
    $scope.confirm = function(item) {
        vm.item = item;
        $("#myModal").modal("show");
    };
    $scope.edit = function(item) {
        console.log(item);
        $state.go("dashboard.examquestiondetail", {
            id: item.id,
            itype : item.itype
        });
    };
    $scope.refresh = function() {
        vm.items = ExamQuestionFactory.query();
    };
    $scope.insert = function() {
        $state.go("dashboard.examquestioncreate");
    }
});