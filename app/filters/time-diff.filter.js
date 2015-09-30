(function() {
  'use strict';

  angular.module('topcoder').filter('timeDiff', timeDiff);

  function timeDiff() {
    return function(input, type) {
      var fromNow = moment(input).fromNow(true);
  		// Split into components: ['an', 'hour'] || ['2', 'months']
      var timeAndUnit = fromNow.split(' ');

      if (timeAndUnit[0] === 'a' || timeAndUnit[0] === 'an') {
        timeAndUnit[0] = '1';
      }
      if (type == 'quantity') {
        return timeAndUnit[0];
      } else if (type == 'unit') {
        return timeAndUnit[1];
      } else {
        return timeAndUnit;
      }
    };
  };

})();
