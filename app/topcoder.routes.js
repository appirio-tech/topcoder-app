(function() {
  'use strict';

  angular.module('topcoder').config([
    '$stateProvider',
    '$urlRouterProvider',
    routes
  ]);

  function routes($stateProvider, $urlRouterProvider) {
    var name, state, states;
    states = {
      '404': {
        parent: 'root',
        url: '/404',
        templateUrl: '404.html',
        data: {
          title: 'Page Not Found',
        }
      },
      /**
       * Base state that all other routes should inherit from.
       * Child routes can override any of the specified regions
       */
      'root': {
        url: '',
        abstract: true,
        data: {
          authRequired: false,
        },
        views: {
          'header@': {
            templateUrl: 'layout/header/header.html',
            controller: 'HeaderController',
            controllerAs: 'vm'
          },
          'sidebar@': {
            // TODO revisit to see how the layout works
            templateUrl: 'layout/header/sidebar.html',
          },
          'container@': {
            template: "<div ui-view>Main container, add your stuff here</div>"
          },
          'footer@': {
            templateUrl: 'layout/footer/footer.html',
          }
        }
      },
      'home': {
        // TODO - set new home page
        parent: 'root',
        url: '/',
        template: 'This is the home page'

      }
    };
    for (name in states) {
      state = states[name];
      $stateProvider.state(name, state);
    }
  };
})();
