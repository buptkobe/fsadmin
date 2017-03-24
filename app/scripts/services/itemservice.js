'use strict';

var services = angular.module('sbAdminApp', ['ngResource']);

services.factory('ItemFactory', function ($resource) {
    return $resource(baseURL+'pt/service', 
    	{formid:'common_fit_item', pt_charset:'utf-8'}, {
    	query: { method: 'GET', params:{pt_control_action:'list'}, isArray: true },
        create: { method: 'POST', params:{pt_control_action:'insert'} },
        show: { method: 'GET', params: {id: '@id', pt_control_action:'detail'} },
        update: { method: 'POST', params: {id: '@id', pt_control_action:'update'} },
        delete: { method: 'POST', params: {id: '@id', pt_control_action:'delete'} }
    })
});

services.factory('ScoreFactory', function ($resource) {
    return $resource(baseURL+'pt/service', 
    	{formid:'common_fit_score', pt_charset:'utf-8'}, {
    	query: { method: 'GET', params:{pt_control_action:'list'}, isArray: true },
        create: { method: 'POST', params:{pt_control_action:'insert'} },
        show: { method: 'GET', params: {id: '@id', pt_control_action:'detail'} },
        update: { method: 'POST', params: {id: '@id', pt_control_action:'update'} },
        delete: { method: 'POST', params: {id: '@id', pt_control_action:'delete'} }
    })
});

services.factory('ActivityFactory', function ($resource) {
    return $resource(baseURL+'pt/service', 
    	{formid:'common_fit_activity', pt_charset:'utf-8'}, {
    	query: { method: 'GET', params:{pt_control_action:'list'}, isArray: true },
        create: { method: 'POST', params:{pt_control_action:'insert'} },
        show: { method: 'GET', params: {id: '@id', pt_control_action:'detail'} },
        update: { method: 'POST', params: {id: '@id', pt_control_action:'update'} },
        delete: { method: 'POST', params: {id: '@id', pt_control_action:'delete'} },
        current:{ method: 'GET', params:{pt_control_action:'current'},isArray: true},
        listbyuser: { method: 'GET', params:{pt_control_action:'listbyuser'}, isArray: true },
        listbyapply: { method: 'GET', params:{pt_control_action:'listbyapply'}, isArray: true },
        currentbyapply:{ method: 'GET', params:{pt_control_action:'currentbyapply'}, isArray: true }
    })
});

services.factory('ApplyFactory', function ($resource) {
    return $resource(baseURL+'pt/service', 
    	{formid:'common_fit_apply', pt_charset:'utf-8'}, {
    	query: { method: 'GET', params:{pt_control_action:'list'}, isArray: true },
        create: { method: 'POST', params:{pt_control_action:'insert'} },
        show: { method: 'GET', params: {id: '@id', pt_control_action:'detail'} },
        update: { method: 'POST', params: {id: '@id', pt_control_action:'update'} },
        delete: { method: 'POST', params: {id: '@id', pt_control_action:'delete'} },
        hasapply: { method: 'GET', params:{pt_control_action:'hasapply'}}
    })
});

services.factory('UsersFactory', function ($resource) {
    return $resource(baseURL+'pt/service', 
    	{formid:'common_fit_users', pt_charset:'utf-8'}, {
        query: { method: 'GET', params:{pt_control_action:'userlist'}, isArray: true },
        create: { method: 'POST', params:{pt_control_action:'insert'} }
    })
});

services.factory('UserFactory', function ($resource) {
    return $resource(baseURL+'pt/service', 
    	{formid:'common_fit_users', pt_charset:'utf-8'}, {
        show: { method: 'GET', params: {id: '@id', pt_control_action:'userdetail'} },
        update: { method: 'POST', params: {id: '@id', pt_control_action:'update'} },
        delete: { method: 'POST', params: {id: '@id', pt_control_action:'delete'} },
        getbycode: { method: 'GET', params: {pt_control_action:'getbycode'} }
    })
});

services.factory('SysuserFactory', function ($resource) {
    return $resource(baseURL+'pt/service', 
    	{formid:'common_fit_sysuser', pt_charset:'utf-8'}, {
    	query: { method: 'GET', params:{pt_control_action:'list'}, isArray: true },
        create: { method: 'POST', params:{pt_control_action:'insert'} },
        show: { method: 'GET', params: {id: '@id', pt_control_action:'detail'} },
        update: { method: 'POST', params: {id: '@id', pt_control_action:'update'} },
        delete: { method: 'POST', params: {id: '@id', pt_control_action:'delete'} }
    })
});

services.factory('ExamFactory', function ($resource) {
    return $resource(baseURL+'pt/service', 
        {formid:'common_fit_exam', pt_charset:'utf-8'}, {
        query: { method: 'GET', params:{pt_control_action:'list'}, isArray: true }
    })
});

services.factory('ShareFactory', function ($resource) {
    return $resource(baseURL+'pt/service', 
        {formid:'common_fit_share', pt_charset:'utf-8'}, {
        query: { method: 'GET', params:{pt_control_action:'config'}}
    })
});

services.factory('ImageFactory', function ($resource) {
    return $resource(baseURL+'pt/service', 
        {formid:'common_fit_image', pt_charset:'utf-8'}, {
        query: { method: 'GET', params:{pt_control_action:'list'}, isArray: true},
        delete: { method: 'POST', params:{pt_control_action: "delete"}}
    })
});

services.factory('ExamSettingFactory', function ($resource) {
    return $resource(baseURL+'pt/service', 
        {formid:'common_fit_examsetting', pt_charset:'utf-8'}, {
        query: { method: 'GET', params:{pt_control_action:'list'}},
        update: { method: 'POST', params:{pt_control_action: "update"}}
    })
});

services.factory('LevelFactory', function ($resource) {
    return $resource(baseURL+'pt/service', 
        {formid:'common_fit_level', pt_charset:'utf-8'}, {
        query: { method: 'GET', params:{pt_control_action:'list'}, isArray: true},
        create: { method: 'POST', params:{pt_control_action: "insert"}},
        show: {
            method: "GET",
            params: {
                id: "@id",
                pt_control_action: "detail"
            }
        },
        update: {
            method: "POST",
            params: {
                id: "@id",
                pt_control_action: "update"
            }
        },
        "delete": {
            method: "POST",
            params: {
                id: "@id",
                pt_control_action: "delete"
            }
        },
        querybyscore: {
            method: "GET",
            params: {
                pt_control_action: "querybyscore"
            }
        }
    })
});