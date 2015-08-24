
(function() {
  'use strict';

  angular.module('topcoder').filter('iif', iif);

  /**
   * This filter enable conditional statment for angular expression.
   * usage: {{ expression | iif : value1 : value2}}
   */
  function iif() {
    return function (input, trueValue, falseValue) {
      return input ? trueValue : falseValue;
    };
  };

})();