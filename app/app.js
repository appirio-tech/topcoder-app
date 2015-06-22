(function() {
  'use strict';

  var dependencies = [
    'ui.router'
  ];

  angular
    .module('topcoder-account', dependencies)
    .run(appRun);

  appRun.$inject = ['$rootScope', '$state'];

  function appRun($rootScope, $state) {
    // Attaching $state to the $rootScope allows us to access the
    // current state in index.html (see div with ui-view on the index page)
    $rootScope.$state = $state;
  }

})();
