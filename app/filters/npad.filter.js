(function() {
  'use strict';

  angular.module('topcoder').filter('npad', npad);

  function npad() {
    return function(input, n) {
      if(input === undefined)
        input = ""
      var inputStr = input;
      if (typeof input !== 'String') {
        inputStr = input.toString();
      }
      if(inputStr.length >= n)
        return inputStr
      var zeros = "0".repeat(n);
      return (zeros + inputStr).slice(-1 * n)
    };
  }

})();