(function() {
  'use strict';

  angular.module('topcoder').filter('localTime', localTime);

  function localTime() {
    var timezone = jstz.determine().name();
    return function(input, format) {
	    format = format ? format : 'MM/DD/YY hh:mm a z';
      return moment(input).tz(timezone).format(format);
    };
  };

})();
