"use strict";
angular.module("sbAdminApp").controller("ExamQuestionCreateCtrl", function($scope, $stateParams, ExamQuestionFactory, $state, toastr) {
    var vm = $scope.vm = {
        show_error: false,
        show_type: 3,
        item: {
            itype: 1,
            answer: 'A'
        }
    };

    console.log($stateParams.id);

    vm.submit = function(basic_form) {
        vm.show_error = true;
        basic_form.$setDirty();
        if (basic_form.$valid) {
            if (vm.item.update) {
            	ExamQuestionFactory.update(vm.item, function() {
                    toastr.success('保存成功!');
                    $state.go("dashboard.examquestionlist")
                })
            } else {
                ExamQuestionFactory.create(vm.item, function() {
                    toastr.success('保存成功!');
                    $state.go("dashboard.examquestionlist")
                })
            };
        }
    };

    vm.change_show_type = function(form) {
        if (vm.show_type == 2) {
            vm.show_error = true;
        } else {
            vm.show_error = false;
        }

        // 重置表单
        vm.item = {};
        form.$setPristine();

    }
});