'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:UserlistCtrl
 * @description
 * # UserlistCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ApplyCreateCtrl', function ($scope,$http,baseUrl,ApplyFactory,ActivityFactory,UserFactory,UsersFactory,$state, toastr, $stateParams,$location,$filter) {
        var vm = $scope.vm = {
            item: {},
            hasapply :true,
            submittext: '报 名',
            user: {}
        };
        UserFactory.getbycode({code:$location.search().code}, function(response){
        	vm.user = response;
        	if (!vm.user.name) {
        		toastr.error('用户未注册，请先在注册页面注册！');
        		return;
        	}

        	ActivityFactory.currentbyapply({openid: vm.user.openid}, function(response) {
	        	vm.activities = response;
                vm.activity = response[0];
                vm.activityid = vm.activity.id;
        		if (vm.activity.user) {
        			vm.hasapply = true;
        			vm.submittext = '已 报 名';
        		} else {
        			vm.hasapply = false;
        			vm.submittext = '报 名';
        		}
	        });
        });
        /*vm.user.openid = '123';
        ActivityFactory.currentbyapply({openid: vm.user.openid}, function(response) {
            vm.activities = response;
            vm.activity = response[0];
            vm.activityid = vm.activity.id;
            if (vm.activity.user) {
                vm.hasapply = true;
                vm.submittext = '已 报 名';
            } else {
                vm.hasapply = false;
                vm.submittext = '报 名';
            }
        });*/


        vm.activityChange = function () {
            var a = $filter('filter')(vm.activities, {id: vm.activityid})[0];
            vm.activity = a;
            if (vm.activity.user) {
                vm.hasapply = true;
                vm.submittext = '已 报 名';
            } else {
                vm.hasapply = false;
                vm.submittext = '报 名';
            }
        }

        vm.submit = function (basic_form) {
            $http({
                url: baseUrl + 'pt/service?formid=common_fit_pay&pt_control_action=pay&pt_charset=utf-8',
                method: 'POST',
                data: {
                    applyfee: vm.activity.applyfee,
                    title: vm.activity.title,
                    openid: vm.user.openid
                }
            }).then(function(response) {
                WeixinJSBridge.invoke('getBrandWCPayRequest',{
                     "appId" : response.data.appId,
                     "timeStamp" : response.data.timeStamp, 
                     "nonceStr" : response.data.nonceStr, 
                     "package" : response.data.package,
                     "signType" : "MD5", 
                     "paySign" : response.data.sign
                    },function(res){
                        WeixinJSBridge.log(res.err_msg);
        //              alert(res.err_code + res.err_desc + res.err_msg);
                        if(res.err_msg == "get_brand_wcpay_request:ok"){  
                            toastr.success("微信支付成功!");  

                            UsersFactory.create(vm.user, function() {
                                toastr.success('用户信息保存成功!');
                            });

                            ApplyFactory.create({
                                user: vm.user.openid,
                                activity: vm.activity.id
                            }, function() {
                                toastr.success('报名成功!');
                                $state.go('fitactivityall', {openid : vm.user.openid});
                            });

                            
                        }else if(res.err_msg == "get_brand_wcpay_request:cancel"){  
                            toastr.error("用户取消支付!");  
                        }else{  
                            toastr.error("支付失败!");  
                        }  
                    })
                }
            , function(error) {
              alert(error.data);
            });
        };

    });