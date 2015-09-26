(function() {
  'use strict';

  angular.module('tc.peer-review').filter('reviewStatus', function() {
    return function(input) {
      var status = 'Not Submitted';
      if (input === 1) {
        status = 'Completed';
      }
      return status;
    };
  });
})();
