"use strict";
angular.module("sbAdminApp").controller("ImageManageCtrl", function($scope, ImageFactory, $state) {
    var vm = $scope.vm = {};
    vm.items = [];
    ImageFactory.query([], function(resp) {
        vm.items = resp;
    });

    vm.checkAll = function(checked) {
        console.log(checked), vm.items = _.each(vm.items, function(item) {
            item.checked = checked;
        })
    };

    vm.selection = function() {
        return _.where(vm.items, {
            checked: true
        })
    };

    $scope.confirm = function() {
        $("#myModal").modal("show");
    };

    $scope["delete"] = function() {
        var selecteds = vm.selection(),
            selectids = [];
        _.each(selecteds, function(select) {
            selectids.push(select.id);
        });
        ImageFactory["delete"]({
            ids: JSON.stringify(selectids)
        }, function(resp) {
            ImageFactory.query([], function(resp) {
                vm.items = resp;
            });
            $("#myModal").modal("hide");
        });
    };

    $scope.refresh = function() {
        ImageFactory.query([], function(resp) {
            vm.items = resp;
        })
    };

    $scope.insert = function() {
        $state.go("dashboard.imageupload");
    }
});