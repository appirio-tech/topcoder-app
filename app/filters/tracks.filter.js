(function() {
  'use strict';

  angular.module('topcoder').filter('displayTracks', DisplayTracks);

  function DisplayTracks() {
    var map = {
      'DESIGN' : 'Designer',
      'DEVELOP': 'Developer',
      'DATA'   : 'Data Scientist'
    };
    return function(tracks) {
      if (tracks)
        return _.map(tracks, function(n) { return map[n.toUpperCase()]}).join(", ");
      return '';
    };
  }

})();
