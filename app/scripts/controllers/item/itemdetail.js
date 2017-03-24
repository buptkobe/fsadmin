'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('ItemDetailCtrl',
        function($scope, $stateParams, ItemFactory, $state) {
            var vm = $scope.vm = {
                show_error: false,
                show_type: 3,
                item: {}
            };

            vm.item = ItemFactory.show({
                id: $stateParams.id
            }, function() {

            });


            // callback for'updateStudent':
            $scope.update = function(basic_form) {
                vm.show_error = true;
                basic_form.$setDirty();
                if (basic_form.$valid) {
                    ItemFactory.update({
                        id: $stateParams.id
                    }, vm.item, function() {
                        $state.go('dashboard.itemlist');
                    });
                }
            };

            // callback 'cancel':
            $scope.cancel = function() {
                $state.go('dashboard.itemlist');
            };

        });