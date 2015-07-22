(function() {
  'use strict';

  angular.module('topcoder').filter('displayTracks', DisplayTracks);

  function DisplayTracks() {
    var map = {
      'design'       : 'Designer',
      'develop'      : 'Developer',
      'data science' : 'Data Scientist'
    };
    return function(tracks) {
      return tracks.map(function(track) {
        return map[track];
      }).join(', ');
    };
  }

})();
