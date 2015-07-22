(function() {
  'use strict';

  angular.module('topcoder').filter('displayLocation', DisplayLocation);

  function DisplayLocation() {
    return function(components) {
      return components.join(', ');
    };
  }

})();
