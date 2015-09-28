(function() {
  'use strict';

  angular.module('topcoder').filter('role', RoleFilter);

  function RoleFilter() {
    var map = {
      'DESIGN' : 'Designer',
      'DEVELOP': 'Developer',
      'DATA_SCIENCE': 'Data Scientist',
      'COPILOT': 'Copilot'
    };
    return function(tracks) {
      if (tracks) {
        if (typeof tracks === 'string')
          return map[tracks];
        else
          return tracks.map(function(track) {
            return map[track.toUpperCase()];
          });
      }
      return '';
    };
  }

})();
