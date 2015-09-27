(function() {
  'use strict';

  angular.module('topcoder').filter('track', TrackFilter);

  function TrackFilter() {

    return function(tracks) {

      var map = {
        'UI_PROTOTYPE_COMPETITION': 'UI Prototype Competition',
        'RIA_BUILD_COMPETITION': 'RIA Build Competition',
        'RIA_COMPONENT_COMPETITION': 'RIA Component Competition',
        'DEVELOP_MARATHON_MATCH': 'Marathon Match',
        'FIRST_2_FINISH': 'First2Finish',
        'BANNERS_OR_ICONS': 'Banners / Icons',
        'PRINT_OR_PRESENTATION': 'Print / Presentation',
        'WIDGET_OR_MOBILE_SCREEN_DESIGN': 'Widget or Mobile Screen Design',
        'FRONT_END_FLASH': 'Front-End Flash',
        'APPLICATION_FRONT_END_DESIGN': 'Application Front-End Design',
        'DESIGN_FIRST_2_FINISH': 'Design First2Finish',
        'DEVELOP': 'DEVELOPMENT'
      };

      function capitalized(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      }

      function filter(track) {
        if (map[track]) {
          return map[track];
        } else {
          return track.split('_').map(capitalized).join(' ');
        }
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
