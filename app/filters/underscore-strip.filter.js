(function() {
  'use strict';

  angular.module('topcoder').filter('underscoreStrip', underscoreStrip);

  function underscoreStrip() {
    return function(string) {
      var map = {
        'ASSEMBLY_COMPETITION': 'ASSEMBLY'
      };
      if (map[string]) {
        return map[string];
      }
      if (!string) {
        return '';
      }
      return string.replace(/_/g, ' ');
    };
  }

})();
