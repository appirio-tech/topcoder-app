(function() {
  'use strict';

  angular.module('topcoder').filter('deadlineStartMsg', deadlineStartMsg);

  function deadlineStartMsg() {
    return function(input) {
      if (moment(input).fromNow().indexOf('in') == 0) {
        return 'begins';
      }
      if (moment(input).fromNow().indexOf('ago') != -1) {
        return 'began';
      }
      return '';
    };
  };

  angular.module('topcoder').filter('deadlineEndMsg', deadlineEndMsg);

  function deadlineEndMsg() {
    return function(input) {
      if (moment(input).fromNow().indexOf('in') == 0) {
        return 'ends';
      }
      if (moment(input).fromNow().indexOf('ago') != -1) {
        return 'ended';
      }
      return '';
    };
  };

})();
