(function() {
  'use strict';

  angular.module('topcoder').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$urlMatcherFactoryProvider',
    routes
  ]);

  function routes($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {

    // ensure we have a trailing slash
    $urlMatcherFactoryProvider.strictMode(true);
    // rule to add trailing slash
    $urlRouterProvider.rule(function($injector, $location) {
      var path = $location.url();
      // check to see if the path already has a slash where it should be
      if (path[path.length - 1] === '/' || path.indexOf('/?') > -1 || path.indexOf('/#') > -1) {
        return;
      }
      if (path.indexOf('?') > -1) {
        return path.replace('?', '/?');
      }
      return path + '/';
    });

    var states = {
      '404': {
        parent: 'root',
        url: '/404/',
        template: '<div><img ng-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8J45Krm40FLDAiD7_muHh081I1o4s2gPcl-uAVu5JvSL1Qqx5"></div>',
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
        template: 'This is the home page',
        controller: ['$state', function($state) {
          $state.go('sample');
        }]
      }
    };

    angular.forEach(states, function(state, name) {
      $stateProvider.state(name, state);
    });

    $urlRouterProvider.otherwise(function($injector) {
      $injector.invoke(['$state', 'CONSTANTS', function($state, CONSTANTS) {
        if ($location.host().indexOf('local') == -1) {
          var absUrl = CONSTANTS.MAIN_URL + window.location.pathname;
          if (window.location.search)
            absUrl += window.location.search;
          if (window.location.hash)
            absUrl += window.location.hash;
          window.location.replace(absUrl);
        } else {
          // locally redirect to 404
          $state.go('404');
        }
      }]);

    });
  };
})();
