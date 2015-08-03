(function() {
  'use strict';

  angular.module('topcoder').directive('assetSrc', ['CONSTANTS', function(consts) {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              attr.$set('src', consts.ASSET_PREFIX + attr.assetSrc);
          }
      };
  }]);
})();
