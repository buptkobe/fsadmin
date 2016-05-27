'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:UserlistCtrl
 * @description
 * # UserlistCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ScoreListCtrl', function ($scope, ScoreFactory,ActivityFactory, $state, toastr,$filter,$location) {
       var vm = $scope.vm = {};
        
       vm.activities = ActivityFactory.query([], function(response){
       		vm.activity = response[0].id;
       		ScoreFactory.query({activity:vm.activity}, function(response){
       			vm.items = response;

            if ($location.search().code) {
              UserFactory.getbycode({code:$location.search().code}, function(response){
                vm.user = response;
                var i = $filter("filter")(vm.items, vm.user.name);
                console.log(i[0]);
                vm.myorder = vm.items.indexOf(i[0]) + 1;
              });
            }
       		});
       });
       
       $scope.change = function() {
       		ScoreFactory.query({activity:vm.activity}, function(response){
       			vm.items = response;
       		});
       }
       
        
          
    });