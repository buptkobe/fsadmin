'use strict';

angular.module('sbAdminApp').filter('loadmore', function() {
  return function (items, index, pageSize) {
    if (!items)
      return [];

    var end = index * pageSize;
    return items.slice(0, end);
  }
});