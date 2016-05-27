'use strict';
angular.module('sbAdminApp')
  .controller('ExamListCtrl', function ($scope, $location,ShareFactory,UserFactory,ExamFactory, $state, toastr,$filter,$timeout) {
  		ShareFactory.query({}, function(response){
  			wx.config({
			    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			    appId: response.appId, // 必填，公众号的唯一标识
			    timestamp: response.timestamp, // 必填，生成签名的时间戳
			    nonceStr: response.nonceStr, // 必填，生成签名的随机串
			    signature: response.signature,// 必填，签名，见附录1
			    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});

			wx.hideOptionMenu();
  		});
  		

  		var vm = $scope.vm = {};

  		vm.index = 0;
  		vm.size = 20;//默认做20道题
  		vm.begin = true;
  		vm.score = 0;
  		vm.exam = false;
  		vm.end = false;
  		vm.itype = 1;
  		vm.imgurl = "http://trainingday.cn/fitspt/app/images/xp.jpg";
  		vm.link = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe9ccb0a5cdb1b373&redirect_uri=http%3a%2f%2ftrainingday.cn%2ffitspt%2fapp%2fredirect.html%3froute%3dfitexamlist&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";

  		UserFactory.getbycode({code:$location.search().code}, function(response){
            vm.user = response;
        });

  		var timer = $("timer")[0];
        $scope.resumeTimer = function () {
        	timer.stop();
        };

        $scope.startTimer = function () {
        	timer.start();
        	vm.begin = false;
        	vm.exam = true;
        	ExamFactory.query({itype: vm.itype}, function(response) {
	  			vm.questions = $filter("randomsort")(response, vm.size);
	  			//console.log(vm.questions);
	  			vm.question = vm.questions[vm.index];
	  		});
        };

        $scope.$on('timer-stopped', function (event, data){
            //console.log('Timer Stopped - data = ', data.seconds);
            //console.log(event.targetScope);
            //console.log(vm.question.choice);
            //console.log(vm.question.answer);
            //console.log(event.targetScope.countdown);
            if (event.targetScope.countdown == 0) {
            	vm.result = "timeout";
            } else if (vm.question.choice == vm.question.answer) {
            	vm.result = "right";
            	vm.score = vm.score + 5;
            } else {
            	vm.result = "wrong";
            }
            //console.log(vm.result);
            if (vm.index != vm.size-1) {
	            event.targetScope.countdown = event.targetScope.countdownattr;
	            event.targetScope.progressBar = 0;
        	}
            
            if (vm.result == 'timeout') 
            	toastr.warning('超时');
            else if (vm.result == 'right')
            	toastr.success('正确');
            else if (vm.result == 'wrong')
            	toastr.error('错误');
            
            $timeout(function () {
            	vm.index ++;
            	//console.log(vm.index);
            	if (vm.index == vm.size) {
            		timer.clear();
            		vm.exam = false;
            		vm.end = true;

            		wx.ready(function () {
            			wx.showOptionMenu();
						wx.onMenuShareTimeline({
						    title: vm.user.nickname + '测试得分' + vm.score, // 分享标题
						    link: vm.link, // 分享链接
						    imgUrl: vm.imgurl, // 分享图标
						    success: function () { 
						        // 用户确认分享后执行的回调函数
						    },
						    cancel: function () { 
						        // 用户取消分享后执行的回调函数
						    }
						});

						wx.onMenuShareAppMessage({
						    title: '健身知识挑战', // 分享标题
						    desc: vm.user.nickname + '测试得分' + vm.score, // 分享描述
						    link: vm.link, // 分享链接
						    imgUrl: vm.imgurl, // 分享图标
						    type: '', // 分享类型,music、video或link，不填默认为link
						    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
						    success: function () { 
						        // 用户确认分享后执行的回调函数
						    },
						    cancel: function () { 
						        // 用户取消分享后执行的回调函数
						    }
						});
					});
            	} else {
                	vm.question = vm.questions[vm.index];
                	//console.log(vm.question);
                	
	                timer.start();
                }
            }, 1000);
            
        });
   });