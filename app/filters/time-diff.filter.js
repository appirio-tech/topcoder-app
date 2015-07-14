(function() {
  'use strict';

  angular.module('topcoder').filter('timeDiff', timeDiff);

  function timeDiff() {
    return function(input) {
      return moment(input).fromNow();
    };
  };

})();
