(function() {
  'use strict';

  angular.module('topcoder').filter('deadlineMsg', deadlineMsg);

  function deadlineMsg() {
    return function(input) {
      if (moment(input).fromNow().indexOf('in') == 0) {
        return 'Starts ';
      }
      if (moment(input).fromNow().indexOf('ago') == 0) {
        return 'Ended ';
      }
      return '';
    };
  };

})();
