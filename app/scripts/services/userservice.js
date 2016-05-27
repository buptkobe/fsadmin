'use strict';

/* Services */

/*
@auth jayasree
Does the CRUD Operations for User Object

 */




var services = angular.module('sbAdminApp', ['ngResource']);

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
        delete: { method: 'POST', params: {id: '@id', pt_control_action:'delete'} }
    })
});
