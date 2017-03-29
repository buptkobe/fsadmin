"use strict";
angular.module("sbAdminApp").controller("ExamQuestionDetailCtrl", function($scope, $stateParams, ExamQuestionFactory, $state, toastr) {
    var vm = $scope.vm = {
        show_error: false,
        show_type: 3,
        item: {}
    };
    ExamQuestionFactory.show({
        id: $stateParams.id,
        itype : $stateParams.itype
    }, function(response) {
        vm.item = response
    });
    $scope.update = function(basic_form) {
        vm.show_error = true;
        basic_form.$setDirty();
        //console.log(vm.item);
        if (basic_form.$valid) {
            ExamQuestionFactory.update({
                oldid: $stateParams.id,
                olditype : $stateParams.itype
            }, vm.item, function() {
                $state.go("dashboard.examquestionlist");
            });
        }
    };
    $scope.cancel = function() {
        $state.go("dashboard.examquesitonlist");
    }
});