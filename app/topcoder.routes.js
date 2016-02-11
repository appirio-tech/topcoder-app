import angular from 'angular'
import moment from 'moment'

(function() {
  'use strict'

  angular.module('topcoder').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$urlMatcherFactoryProvider',
    '$locationProvider',
    routes
  ])

  function routes($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider) {
    $locationProvider.html5Mode(true)

    // ensure we have a trailing slash
    $urlMatcherFactoryProvider.strictMode(true)
    // rule to add trailing slash
    $urlRouterProvider.rule(function($injector) {
      var $location = $injector.get('$location')
      var path = $location.url()
      // check to see if the path already has a slash where it should be
      if (path[path.length - 1] === '/' || path.indexOf('/?') > -1 || path.indexOf('/#') > -1) {
        return
      }
      if (path.indexOf('?') > -1) {
        return path.replace('?', '/?')
      }
      return path + '/'
    })

    var states = {
      '404': {
        parent: 'root',
        url: '/404/',
        template: '',
        // template: '<div><img ng-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8J45Krm40FLDAiD7_muHh081I1o4s2gPcl-uAVu5JvSL1Qqx5"></div>',
        data: {
          authRequired: false,
          title: 'Page Not Found'
        },
        controller: ['CONSTANTS', function(CONSTANTS) {
          window.location.href = CONSTANTS.MAIN_URL + '/404/'
        }]
      },
      // Base state that all other routes should inherit from.
      // Child routes can override any of the specified regions
      'root': {
        url: '',
        abstract: true,
        data: {
          authRequired: false
        },
        views: {
          'header@': {
            template: require('./layout/header/header')(),
            controller: 'HeaderController',
            controllerAs: 'vm'
          },
          'container@': {
            template: '<div ui-view class=\"page-container\"></div>'
          },
          'footer@': {
            template: require('./layout/footer/footer')(),
            controller: ['$scope', 'CONSTANTS', function($scope, CONSTANTS) {
              $scope.domain = CONSTANTS.domain
              $scope.currentYear = moment().format('YYYY')
            }]
          }
        }
      },
      'home': {
        parent: 'root',
        url: '/',
        controller: ['$state', function($state) {
          $state.go('dashboard')
        }]
      }
    }

    angular.forEach(states, function(state, name) {
      $stateProvider.state(name, state)
    })

    $urlRouterProvider.otherwise(function($injector) {
      $injector.invoke(['$state', 'CONSTANTS', '$location', function($state, CONSTANTS, $location) {
        if ($location.host().indexOf('local') == -1) {
          var absUrl = CONSTANTS.MAIN_URL + window.location.pathname
          if (window.location.search)
            absUrl += window.location.search
          if (window.location.hash)
            absUrl += window.location.hash
          window.location.replace(absUrl)
        } else {
          // locally redirect to 404
          $state.go('404')
        }
      }])

    })
  }
})()
