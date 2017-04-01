"use strict";
angular.module("sbAdminApp").controller("ExamListCtrl", function($window, $scope, $location, LevelFactory, ShareFactory, UserFactory, ExamFactory, $state, toastr, $filter, $timeout, ExamSettingFactory) {
    var vm = $scope.vm = {};
    vm.hold = 1000;
    vm.index = 0;
    vm.size = 20;
    vm.begin = true;
    vm.score = 0;
    vm.exam = false;
    vm.end = false;
    vm.itype = 1;
    vm.imgurl = "http://trainingday.cn/fitspt/app/images/xp.jpg";
    vm.link = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe9ccb0a5cdb1b373&redirect_uri=http%3a%2f%2ftrainingday.cn%2ffitspt%2fapp%2fredirect.html%3froute%3dfitexamlist&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
   
    var timer = $("timer")[0];
    ExamSettingFactory.query([], function(resp) {
        vm.size = resp.questions;
        vm.imgurl = "http://trainingday.cn/fitspt/imageshow?id=" + resp.shareimg;
        vm.link = resp.sharelink;
        vm.sharetitle = resp.sharetitle;
        vm.sharedesc = resp.sharedesc;
        vm.timeout = resp.timeout;
    });
    UserFactory.getbycode({
        code: $location.search().code
    }, function(response) {
        vm.user = response
    });
    ShareFactory.query({}, function(response) {
        wx.config({
            debug: !1,
            appId: response.appId,
            timestamp: response.timestamp,
            nonceStr: response.nonceStr,
            signature: response.signature,
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
        });
        wx.hideOptionMenu();
    });

    $scope.resumeTimer = function() {
        timer.stop();
    };

    $scope.startTimer = function() {
        timer.start();
        vm.begin = false;
        vm.exam = true;
        ExamFactory.query({
            itype: vm.itype,
            openid: vm.user.openid
        }, function(response) {
            vm.questions = $filter("randomsort")(response, vm.size);
            vm.question = vm.questions[vm.index];
        })
    };

    $scope.$on("timer-stopped", function(event, data) {
        //console.log('Timer Stopped - data = ', data.seconds);
        //console.log(event.targetScope);
        //console.log(vm.question.choice);
        //console.log(vm.question.answer);
        //console.log(event.targetScope.countdown);

        if (event.targetScope.countdown == 0) {
            vm.result = "timeout";
        } else if (vm.question.choice == vm.question.answer) {
            vm.result = "right";
            vm.score = vm.score + 100 / vm.size;
            if (false == vm.question.rightflag)
                vm.question.needsave = true;
        } else {
            vm.result = "wrong";

        }

        //console.log(vm.result);
        if (vm.index != vm.size - 1) {
            event.targetScope.countdown = event.targetScope.countdownattr;
            event.targetScope.progressBar = 0;
        }

        if (vm.result == 'timeout') {
            toastr.warning('超时');
            vm.displayanswer = vm.question.answer;
        } else if (vm.result == 'right') {
            toastr.success('正确');
            vm.holdon = 1000;
        } else if (vm.result == 'wrong') {
            toastr.error('错误');
            vm.displayanswer = vm.question.answer;
            vm.holdon = 2000;
        }

        $timeout(function() {
            toastr.clear();
        }, 1000);

        $timeout(function() {
            vm.index++;

            //console.log(vm.index);
            if (vm.index == vm.size) {

                timer.clear();
                toastr.clear();
                vm.exam = false;
                vm.end = true;
                var needsavequestions = _.where(vm.questions, {
                    needsave: true
                });
                ExamFactory.savequestion({
                    questions: JSON.stringify(needsavequestions),
                    openid: vm.user.openid
                });
                wx.ready(function() {
                    wx.showOptionMenu();
                    vm.sharetitle = vm.sharetitle.replace(/username/g, vm.user.nickname);
                    vm.sharetitle = vm.sharetitle.replace(/score/g, vm.score);
                    LevelFactory.querybyscore({
                        score: vm.score
                    }, function(resp) {
                        vm.sharetitle = vm.sharetitle.replace(/level/g, resp.name);
                        wx.onMenuShareTimeline({
                            title: vm.sharetitle + "," + vm.sharedesc,
                            link: vm.link,
                            imgUrl: vm.imgurl,
                            success: function() {},
                            cancel: function() {}
                        }), wx.onMenuShareAppMessage({
                            title: vm.sharetitle,
                            desc: vm.sharedesc,
                            link: vm.link,
                            imgUrl: vm.imgurl,
                            type: "",
                            dataUrl: "",
                            success: function() {},
                            cancel: function() {}
                        })
                    })
                })
            } else {
                vm.question = vm.questions[vm.index];
                timer.start();
            }
            vm.displayanswer = "";
        }, vm.holdon);
    });

    $scope.tomain = function() {
        $window.location.href = "http://m.trainingday.cn";
    }
});