(function() {
  'use strict';

  angular.module('topcoder').filter('join', joinArray);

  function joinArray() {
    return function (input, delimiter) {
      if (_.isUndefined(input) || !_.isArray(input)) {
        return input;
      }
      if (_.isUndefined(delimiter)) {
        delimiter = ', ';
      }

      return input.join(delimiter);
    };
  }

})();
