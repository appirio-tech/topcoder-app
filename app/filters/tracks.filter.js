(function() {
  'use strict';

  angular.module('topcoder').filter('displayTracks', DisplayTracks);

  function DisplayTracks() {
    var map = {
      'Design'       : 'Designer',
      'Develop'      : 'Developer',
      'Data Science' : 'Data Scientist'
    };
    return function(tracks) {
      return tracks.map(function(track) {
        return map[track];
      }).join(', ');
    };
  }

})();
