'use strict';

/* Services */

/*
@auth jayasree
Does the CRUD Operations for Student Object

 */


var baseURL =  'http://localhost:9000/';

var services = angular.module('sbAdminApp', ['ngResource']);

services.factory('DummyFactory', function ($resource) {
    return $resource(baseURL+'rest/student/dummy', {}, {
      query: { method: 'GET', params: {}, isArray: false }
    })
});

services.factory('StudentsFactory', function ($resource) {
    return $resource(baseURL+'rest/students/create.json', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('StudentFactory', function ($resource) {
    return $resource(baseURL+'/rest/students/student/001.json', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});
