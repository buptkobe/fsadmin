"use strict";
angular.module("sbAdminApp").controller("ExamSettingCtrl", function($scope, ImageFactory, ExamSettingFactory, toastr) {
    var vm = $scope.vm = {
        show_error: false,
        show_type: 3
    };
    vm.items = [];
    ExamSettingFactory.query([], function(settingresp) {
        vm.setting = settingresp, ImageFactory.query([], function(resp) {
            vm.items = resp;
            _.findWhere(vm.items, {
                id: vm.setting.shareimg
            }).checked = true;
        })
    });

    vm.select = function(item) {
        item.checked = !item.checked;
        var others = _.without(vm.items, item);
        _.each(others, function(other) {
            other.checked = false;
        })
    };

    vm.sure = function() {
        vm.dropdown = false;
        var i = _.findWhere(vm.items, {
            checked: true
        });
        null == i ? (vm.setting.shareimg = "", vm.setting.imgname = "") : (vm.setting.shareimg = i.id, vm.setting.imgname = i.name)
    };

    vm.submit = function(basic_form) {
        vm.show_error = !0;
        basic_form.$setDirty();
        basic_form.$valid && ExamSettingFactory.update(vm.setting, function() {
            toastr.success("保存成功!")
        });
    }
});