(function() {
  'use strict';

  angular.module('topcoder').filter('joinArray', joinArray);

  function joinArray() {
    return function(array) {
      return array.join(', ');
    };
  }

})();
