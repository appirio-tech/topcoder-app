(function() {
  'use strict';

  angular.module('topcoder').filter('localTime', localTime);

  function localTime() {
    var timezone = jstz.determine().name();
    return function(input) {
      return moment(input).tz(timezone).format('MM/DD/YY hh:mm A z');
    };
  };

  angular.module('topcoder').filter('timeDiff', timeDiff);

  function timeDiff() {
    return function(input) {
      return moment(input).fromNow();
    };
  };

  angular.module('topcoder').filter('deadlineMsg', deadlineMsg);

  function deadlineMsg() {
    return function(input) {
      if (moment(input).fromNow().indexOf('in') == 0) {
        return 'Starts ';
      }
      if (moment(input).fromNow().indexOf('ago') == 0) {
        return 'Ended ';
      }
      return '';
    };
  };

})();
