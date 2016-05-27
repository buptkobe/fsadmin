'use strict';

angular.module('sbAdminApp').filter('randomsort', function() {
  return function (items, size) {
    if (!items)
      return [];

    items.sort(function(){return Math.random()>0.5?-1:1;}); 
    return items.slice(0, size);
  }
});