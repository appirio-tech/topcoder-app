(function() {
  'use strict';

  angular.module('topcoder').filter('underscoreStrip', underscoreStrip);

  function underscoreStrip() {
    return function(string) {
      if (!string) {
        return '';
      }
      return string.replace(/_/g, ' ');
    };
  }

})();
