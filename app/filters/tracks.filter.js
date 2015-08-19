(function() {
  'use strict';

  angular.module('topcoder').filter('displayTracks', DisplayTracks);

  function DisplayTracks() {
    var map = {
      'DESIGN' : 'Designer',
      'DEVELOP': 'Developer',
      'DATA_SCIENCE': 'Data Scientist'
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
