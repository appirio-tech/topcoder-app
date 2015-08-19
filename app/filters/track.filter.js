(function() {
  'use strict';

  angular.module('topcoder').filter('track', TrackFilter);

  function TrackFilter() {

    return function(tracks) {

      function capitalized(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      }

      function filter(track) {
        return track.split('_').map(capitalized).join(' ');
      }

      if (tracks) {
        if (typeof tracks === 'string')
          return filter(tracks);
        else
          return tracks.map(filter);
      } else {
        return '';
      }
    };
  }

})();
