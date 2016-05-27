'use strict';

angular.module('sbAdminApp').filter('size', function() {
  return function (items) {
    if (!items)
      return 0;

    return items.length || 0
  }
});