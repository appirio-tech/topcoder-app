(function() {
  'use strict';

  angular.module('topcoder').filter('country', ['ISO3166', country]);

  function country(ISO3166) {
    return function(alpha) {
      if (alpha.length === 2) {
        return ISO3166.getCountryObjFromAlpha2(alpha).name;
      } else if (alpha.length === 3) {
        return ISO3166.getCountryObjFromAlpha3(alpha).name;
      } else {
        return '';
      }
    };
  }

})();
