'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:UserlistCtrl
 * @description
 * # UserlistCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ScoreCreateCtrl', function ($scope,$http,ActivityFactory,ItemFactory,ScoreFactory,UserFactory, baseUrl, toastr, $state,$location) {
        var vm = $scope.vm = {};
        vm.activities = ActivityFactory.query([], function(response){
            vm.activity = response[0].id;
            
        });

        $scope.selected = undefined;
	    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    	  // Any function returning a promise object can be used to load values asynchronously
    	  $scope.getUser = function(val) {
    	    return $http.get(baseUrl + 'pt/service', {
    	      params: {
    	      	formid: 'common_fit_users',
    	      	pt_control_action: 'typeahead',
    	        name: val,
    	        sensor: false,
                activity: vm.activity
    	      }
    	    }).then(function(response){
    	      return response.data;
    	    });
    	  };

    	  vm.items = ItemFactory.query();

    	  UserFactory.getbycode({code:$location.search().code}, function(response){
            	vm.user = response;
            	if (!vm.user.name) {
            		toastr.error('用户未注册，请先在注册页面注册！');
            		return;
            	}
            });

    	  vm.submit = function (basic_form) {
                vm.show_error = true;
                basic_form.$setDirty();
                if(basic_form.$valid){
                	if (!$scope.asyncSelected.openid) {
                		toastr.error('姓名不存在!');
                		return;
                	}
                    $location.url("/topayServlet?code="
                        +$location.search().code
                        +"&activity="+$location.search().activity);
                }
            };
});