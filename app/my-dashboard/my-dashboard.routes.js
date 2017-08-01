import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.myDashboard').config([
    '$stateProvider',
    routes
  ])

  function routes($stateProvider) {
    var states = {
      'baseDashboard': {
        parent: 'root',
        abstract: true,
        template: require('./my-dashboard')(),
        controller: 'MyDashboardController',
        controllerAs: 'dashboard',
        data: {
          authRequired: true,
          title: 'Dashboard'
        },
        resolve: {
          userIdentity: ['UserService', function(UserService) {
            return UserService.getUserIdentity()
          }]
        }
      },
      'dashboard': {
        url: '/my-dashboard/',
        params: { 'notifyReset': false },
        parent: 'baseDashboard',
        resolve: {
          profile: ['userIdentity', 'ProfileService', function(userIdentity, ProfileService) {
            return ProfileService.getUserProfile(userIdentity.handle)
          }]
        },
        views: {
          'notifications': {
            template: require('./notifications/notifications')(),
            controller: 'NotificationsController',
            controllerAs: 'vm'
          },
          'header-dashboard' : {
            template: require('./header-dashboard/header-dashboard')(),
            controller: 'HeaderDashboardController',
            controllerAs: 'vm'
          },
          'subtrack-stats': {
            template: require('./subtrack-stats/subtrack-stats')(),
            controller: 'SubtrackStatsController',
            controllerAs: 'vm'
          },
          'my-challenges': {
            template: require('./my-challenges/my-challenges')(),
            controller: 'MyChallengesWidgetController',
            controllerAs: 'vm'
          },
          'srms' :{
            template: require('./srms/srms')(),
            controller: 'SRMWidgetController',
            controllerAs: 'vm'
          },
          'programs': {
            template: require('./programs/programs')(),
            controller: 'ProgramsController',
            controllerAs: 'vm'
          },
          'community-updates' : {
            template: require('./community-updates/community-updates')(),
            controller: 'CommunityUpdatesController',
            controllerAs: 'vm'
          }
        }
      }
    }
    for (var name in states) {
      var state = states[name]
      $stateProvider.state(name, state)
    }
  }
})()
