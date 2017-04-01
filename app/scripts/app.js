'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
var baseURL = 'http://192.168.1.105:8080/fitspt/';

angular
    .module('sbAdminApp', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'angular-jwt',
        'angular-storage',
        'toastr',
        'timer',
        'angularFileUpload'
    ], function($httpProvider) {
        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';


        var param = function(obj) {
            var query = '',
                name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; i++) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    })
    .constant('baseUrl', 'http://192.168.1.105:8080/fitspt/')
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', 'jwtInterceptorProvider', '$httpProvider',
        function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, jwtInterceptorProvider, $httpProvider) {

            $ocLazyLoadProvider.config({
                debug: false,
                events: true,
            });

            $urlRouterProvider.otherwise('/dashboard/userlist');

            $stateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'views/dashboard/main.html',
                    data: {
                        requiresLogin: true
                    },
                    resolve: {
                        loadMyDirectives: function($ocLazyLoad) {}
                    }
                })
                .state('dashboard.home', {
                    url: '/home',
                    controller: 'MainCtrl',
                    templateUrl: 'views/dashboard/home.html',
                    data: {
                        requiresLogin: true
                    },
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/main.js',
                                    'scripts/directives/timeline/timeline.js',
                                    'scripts/directives/notifications/notifications.js',
                                    'scripts/directives/chat/chat.js',
                                    'scripts/directives/dashboard/stats/stats.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.form', {
                    templateUrl: 'views/form.html',
                    url: '/form'
                })
                .state('dashboard.blank', {
                    templateUrl: 'views/pages/blank.html',
                    url: '/blank'
                })
                .state('login', {
                    templateUrl: 'views/fitspt/login.html',
                    url: '/login',
                    controller: 'LoginCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/login.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.chart', {
                    templateUrl: 'views/chart.html',
                    url: '/chart',
                    controller: 'ChartCtrl',
                    data: {
                        requiresLogin: true
                    },
                    resolve: {
                        loadMyFile: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                    name: 'chart.js',
                                    files: [
                                        'bower_components/angular-chart.js/dist/angular-chart.min.js',
                                        'bower_components/angular-chart.js/dist/angular-chart.css'
                                    ]
                                }),
                                $ocLazyLoad.load({
                                    name: 'sbAdminApp',
                                    files: ['scripts/controllers/chartContoller.js']
                                })
                        }
                    }
                })
                .state('dashboard.table', {
                    templateUrl: 'views/table.html',
                    url: '/table'
                })
                .state('dashboard.panels-wells', {
                    templateUrl: 'views/ui-elements/panels-wells.html',
                    url: '/panels-wells'
                })
                .state('dashboard.buttons', {
                    templateUrl: 'views/ui-elements/buttons.html',
                    url: '/buttons'
                })
                .state('dashboard.notifications', {
                    templateUrl: 'views/ui-elements/notifications.html',
                    url: '/notifications'
                })
                .state('dashboard.typography', {
                    templateUrl: 'views/ui-elements/typography.html',
                    url: '/typography'
                })
                .state('dashboard.icons', {
                    templateUrl: 'views/ui-elements/icons.html',
                    url: '/icons'
                })
                .state('dashboard.grid', {
                    templateUrl: 'views/ui-elements/grid.html',
                    url: '/grid'
                })
                .state('dashboard.register', {
                    templateUrl: 'views/fitspt/register.html',
                    url: '/register'
                })
                .state('register', {
                    templateUrl: 'views/fitspt/register.html',
                    url: '/fitregister',
                    controller: 'RegisterCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/register.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.studentlist', {
                    templateUrl: 'views/fitspt/student/student-list.html',
                    url: '/studentlist',
                    controller: 'StudentlistCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/studentservice.js',
                                    'scripts/controllers/studentlist.js'

                                ]
                            })
                        }
                    }
                })
                .state('dashboard.studentdetail', {
                    templateUrl: 'views/fitspt/student/student-detail.html',
                    url: '/studentdetail/:id',
                    controller: 'StudentDetailCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/studentservice.js',
                                    'scripts/controllers/studentdetail.js'

                                ]
                            })
                        }
                    }
                })
                .state('dashboard.advtable', {
                    templateUrl: 'views/fitspt/table/table.html',
                    url: '/advtable',
                    controller: 'ctrl.table.local',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'bower_components/moment/min/moment.min.js',
                                    'scripts/controllers/table/paging.js',
                                    'scripts/controllers/table/size.js',
                                    'scripts/controllers/table/orderClass.js',
                                    'scripts/controllers/table/table.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.userlist', {
                    templateUrl: 'views/fitspt/user/user-list.html',
                    url: '/userlist',
                    controller: 'UserlistCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/itemservice.js',
                                    'scripts/controllers/user/userlist.js'

                                ]
                            })
                        }
                    }
                })
                .state('dashboard.userdetail', {
                    templateUrl: 'views/fitspt/user/user-detail.html',
                    url: '/userdetail/:id',
                    controller: 'UserDetailCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/itemservice.js',
                                    'scripts/controllers/user/userdetail.js'

                                ]
                            })
                        }
                    }
                })
                .state('dashboard.usercreate', {
                    templateUrl: 'views/fitspt/user/user-create.html',
                    url: '/usercreate',
                    controller: 'UserCreateCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/itemservice.js',
                                    'scripts/controllers/user/usercreate.js'

                                ]
                            })
                        }
                    }
                })
                .state('fitusercreate', {
                    templateUrl: 'views/fitspt/user/user-create.html',
                    url: '/fitusercreate',
                    controller: 'UserCreateCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/itemservice.js',
                                    'scripts/controllers/user/usercreate.js'

                                ]
                            })
                        }
                    }
                })
                .state('fitscorecreate', {
                    templateUrl: 'views/fitspt/score/score-create.html',
                    url: '/fitscorecreate',
                    controller: 'ScoreCreateCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/itemservice.js',
                                    'scripts/controllers/score/scorecreate.js'

                                ]
                            })
                        }
                    }
                })
                .state('dashboard.scorelist', {
                    templateUrl: 'views/fitspt/score/score-list.html',
                    url: '/scorelist',
                    controller: 'ScoreListCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/itemservice.js',
                                    'scripts/controllers/score/scorelist.js'

                                ]
                            })
                        }
                    }
                })
                .state('dashboard.activitylist', {
                    templateUrl: 'views/fitspt/activity/activity-list.html',
                    url: '/activitylist',
                    controller: 'ActivityListCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/itemservice.js',
                                    'scripts/controllers/activity/activitylist.js'

                                ]
                            })
                        }
                    }
                })
                .state('dashboard.activitycreate', {
                    templateUrl: 'views/fitspt/activity/activity-create.html',
                    url: '/activitycreate',
                    controller: 'ActivityCreateCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/itemservice.js',
                                    'scripts/controllers/activity/activitycreate.js'

                                ]
                            })
                        }
                    }
                })
                .state('dashboard.activitydetail', {
                    templateUrl: 'views/fitspt/activity/activity-detail.html',
                    url: '/activitydetail/:id',
                    controller: 'ActivityDetailCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/itemservice.js',
                                    'scripts/controllers/activity/activitydetail.js'

                                ]
                            })
                        }
                    }
                })
                .state('dashboard.itemlist', {
                    templateUrl: 'views/fitspt/item/item-list.html',
                    url: '/itemlist',
                    controller: 'ItemListCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/itemservice.js',
                                    'scripts/controllers/item/itemlist.js'

                                ]
                            })
                        }
                    }
                })
                .state('dashboard.itemcreate', {
                    templateUrl: 'views/fitspt/item/item-create.html',
                    url: '/itemcreate',
                    controller: 'ItemCreateCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/itemservice.js',
                                    'scripts/controllers/item/itemcreate.js'

                                ]
                            })
                        }
                    }
                })
                .state('dashboard.itemdetail', {
                    templateUrl: 'views/fitspt/item/item-detail.html',
                    url: '/itemdetail/:id',
                    controller: 'ItemDetailCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/itemservice.js',
                                    'scripts/controllers/item/itemdetail.js'

                                ]
                            })
                        }
                    }
                })
                .state('dashboard.applylist', {
                    templateUrl: 'views/fitspt/apply/apply-list.html',
                    url: '/applylist',
                    controller: 'ApplyListCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/itemservice.js',
                                    'scripts/controllers/apply/applylist.js'

                                ]
                            })
                        }
                    }
                })
                .state('fitapplycreate', {
                    templateUrl: 'views/fitspt/apply/apply-create.html',
                    url: '/fitapplycreate',
                    controller: 'ApplyCreateCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/itemservice.js',
                                    'scripts/controllers/apply/applycreate.js'

                                ]
                            })
                        }
                    }
                })
                .state('dashboard.sysusercreate', {
                    templateUrl: 'views/fitspt/sysuser/sysuser-create.html',
                    url: '/sysusercreate',
                    controller: 'SysuserCreateCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/itemservice.js',
                                    'scripts/controllers/sysuser/sysusercreate.js'

                                ]
                            })
                        }
                    }
                })
                .state('dashboard.sysuserlist', {
                    templateUrl: 'views/fitspt/sysuser/sysuser-list.html',
                    url: '/sysuserlist',
                    controller: 'SysuserListCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/itemservice.js',
                                    'scripts/controllers/sysuser/sysuserlist.js'

                                ]
                            })
                        }
                    }
                })
                .state('dashboard.pwdmodify', {
                    templateUrl: 'views/fitspt/sysuser/password-modify.html',
                    url: '/pwdmodify',
                    controller: 'PwdModifyCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/itemservice.js',
                                    'scripts/controllers/sysuser/pwdmodify.js'

                                ]
                            })
                        }
                    }
                })
                .state('fitactivityall', {
                    templateUrl: 'views/fitspt/user/activity-all.html',
                    params: {
                        openid: ''
                    },
                    url: '/fitactivityall',
                    controller: 'ActivityAllCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/itemservice.js',
                                    'scripts/controllers/user/activityall.js'

                                ]
                            })
                        }
                    }
                })
                .state('fitusercenter', {
                    templateUrl: 'views/fitspt/user/user-center.html',
                    url: '/fitusercenter',
                    controller: 'UserCenterCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/itemservice.js',
                                    'scripts/controllers/user/usercenter.js'

                                ]
                            })
                        }
                    }
                })
                .state('fitexamlist', {
                    templateUrl: 'views/fitspt/exam/exam-list.html',
                    url: '/fitexamlist',
                    controller: 'ExamListCtrl',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/services/itemservice.js',
                                    'scripts/controllers/exam/examlist.js'

                                ]
                            })
                        }
                    }
                }).state("dashboard.imageupload", {
                    templateUrl: "views/fitspt/setting/image-upload.html",
                    url: "/imageupload",
                    controller: "ImageUploadCtrl",
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "sbAdminApp",
                                files: [
                                    "scripts/directives/fitspt/thumb.js",
                                    "scripts/controllers/setting/imageupload.js"
                                ]
                            })
                        }
                    }
                }).state("dashboard.imagemanage", {
                    templateUrl: "views/fitspt/setting/image-manage.html",
                    url: "/imagemanage",
                    controller: "ImageManageCtrl",
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "sbAdminApp",
                                files: [
                                    "scripts/services/itemservice.js",
                                    "scripts/controllers/setting/imagemanage.js"
                                ]
                            })
                        }
                    }
                }).state("dashboard.examsetting", {
                    templateUrl: "views/fitspt/setting/exam-setting.html",
                    url: "/examsetting",
                    controller: "ExamSettingCtrl",
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "sbAdminApp",
                                files: [
                                    "scripts/services/itemservice.js",
                                    "scripts/controllers/setting/examsetting.js"
                                ]
                            })
                        }
                    }
                }).state("dashboard.examlevelcreate", {
                    templateUrl: "views/fitspt/exam/examlevel-create.html",
                    url: "/examlevelcreate",
                    controller: "ExamLevelCreateCtrl",
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "sbAdminApp",
                                files: [
                                    "scripts/services/itemservice.js",
                                    "scripts/controllers/exam/examlevelcreate.js"
                                ]
                            })
                        }
                    }
                }).state("dashboard.examlevellist", {
                    templateUrl: "views/fitspt/exam/examlevel-list.html",
                    url: "/examlevellist",
                    controller: "ExamLevelListCtrl",
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "sbAdminApp",
                                files: [
                                    "scripts/services/itemservice.js",
                                    "scripts/controllers/exam/examlevellist.js"
                                ]
                            })
                        }
                    }
                }).state("dashboard.examleveldetail", {
                    templateUrl: "views/fitspt/exam/examlevel-detail.html",
                    url: "/examleveldetail/:id",
                    controller: "ExamLevelDetailCtrl",
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "sbAdminApp",
                                files: [
                                    "scripts/services/itemservice.js",
                                    "scripts/controllers/exam/examleveldetail.js"
                                ]
                            })
                        }
                    }
                }).state("dashboard.examquestionlist", {
                    templateUrl: "views/fitspt/exam/examquestion-list.html",
                    url: "/examquestionlist",
                    controller: "ExamQuestionListCtrl",
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "sbAdminApp",
                                files: [
                                    "scripts/services/itemservice.js",
                                    "scripts/controllers/exam/examquestionlist.js"
                                ]
                            })
                        }
                    }
                }).state("dashboard.examquestioncreate", {
                    templateUrl: "views/fitspt/exam/examquestion-create.html",
                    url: "/examquestioncreate",
                    controller: "ExamQuestionCreateCtrl",
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "sbAdminApp",
                                files: [
                                    "scripts/services/itemservice.js",
                                    "scripts/controllers/exam/examquestioncreate.js"
                                ]
                            })
                        }
                    }
                }).state("dashboard.examquestiondetail", {
                    templateUrl: "views/fitspt/exam/examquestion-detail.html",
                    url: "/examquestiondetail/:id/:itype",
                    controller: "ExamQuestionDetailCtrl",
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "sbAdminApp",
                                files: [
                                    "scripts/services/itemservice.js",
                                    "scripts/controllers/exam/examquestiondetail.js"
                                ]
                            })
                        }
                    }
                }).state("dashboard.examquestionimport", {
                    templateUrl: "views/fitspt/exam/examquestion-import.html",
                    url: "/examquestionimport",
                    controller: "ExamQuestionImportCtrl",
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "sbAdminApp",
                                files: [
                                    "scripts/services/itemservice.js",
                                    "scripts/controllers/exam/examquestionimport.js"
                                ]
                            })
                        }
                    }
                });

            jwtInterceptorProvider.tokenGetter = function(store) {
                return store.get('jwt');
            }

            $httpProvider.interceptors.push('jwtInterceptor');
        }
    ])

.run(function($rootScope, $state, store, jwtHelper) {
    $rootScope.$on('$stateChangeStart', function(e, to) {
        if (to.data && to.data.requiresLogin) {
            if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
                e.preventDefault();
                $state.go('login');
            }
        }
    });
});