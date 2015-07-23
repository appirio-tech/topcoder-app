(function() {
  'use strict';

  angular.module('topcoder').filter('ordinal', ordinal);

  function ordinal() {
    return function(x) {
      x += '';
      var y = x.charAt(x.length - 1);
      var suffix;
      switch (y) {
        case '1':
          suffix = 'st';
          break;
        case '2':
          suffix = 'nd';
          break;
        case '3':
          suffix = 'rd';
          break;
        default:
          suffix = 'th';
      }
      return x + suffix;
    };
  }

})();
