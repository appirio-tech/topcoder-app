(function() {
  'use strict';

  angular.module('topcoder').filter('localTime', localTime);

  function localTime() {
    var timezone = jstz.determine().name();
    return function(input) {
      return moment(input).tz(timezone).format('MM/DD/YY hh:mm A z');
    };
  };

})();
