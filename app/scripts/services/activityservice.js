'use strict';

/* Services */

/*
@auth jayasree
Does the CRUD Operations for User Object

 */




var services = angular.module('sbAdminApp', ['ngResource']);

services.factory('ActivityFactory', function ($resource) {
    return $resource(baseURL+'pt/service', 
    	{formid:'common_fit_activity', pt_charset:'utf-8'}, {
    	query: { method: 'GET', params:{pt_control_action:'list'}, isArray: true },
        create: { method: 'POST', params:{pt_control_action:'insert'} },
        show: { method: 'GET', params: {id: '@id', pt_control_action:'detail'} },
        update: { method: 'POST', params: {id: '@id', pt_control_action:'update'} },
        delete: { method: 'POST', params: {id: '@id', pt_control_action:'delete'} }
    })
});
