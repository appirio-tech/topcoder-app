(function() {
  'use strict';

  angular.module('tc.myDashboard').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    routes
  ]);

  function routes($stateProvider, $urlRouterProvider, $httpProvider) {
    var name, state, states;
    states = {
      'baseDashboard': {
        parent: 'root',
        abstract: true,
        templateUrl: 'member-dashboard/member-dashboard.html',
        controller: 'DashboardController as db',
        data: {
          authRequired: true,
          title: 'Dashboard'
        }
      },
      'dashboard': {
        url: '/my-dashboard',
        parent: 'baseDashboard',
        views: {
          'my-challenges-widget': {
            templateUrl: "member-dashboard/my-challenges/my-challenges.html",
            controller: 'Dashboard.MyChallengesController',
            controllerAs: 'vm'
          },
          'srms-widget' :{
            templateUrl : 'member-dashboard/srms/dashboard-srms.html',
            controller: 'Dashboard.SRMController',
            controllerAs: 'vm'
          },
          'blog-post-widget' : {
            templateUrl : 'member-dashboard/blog-post/blog-feed.html',
            controller: 'BlogPostController',
            controllerAs: 'vm'
          },
          'profile-header-widget' : {
            templateUrl : 'member-dashboard/member-profile/profile-header.html',
            controller: 'Dashboard.ProfileHeaderController',
            controllerAs: 'vm'
          },
          'marketing-message-widget' : {
            templateUrl : 'member-dashboard/marketing-message/marketing-message.html',
            controller: 'MarketingMessageController',
            controllerAs: 'vm'
          },
          'ios-program': {
            templateUrl: 'member-dashboard/ios-program/ios-program.html',
            controller: 'iOSProgramController',
            controllerAs: 'vm'
          }
        }
      }
    };
    for (name in states) {
      state = states[name];
      $stateProvider.state(name, state);
    }
    $urlRouterProvider.otherwise('/');
    return $httpProvider.interceptors.push('HeaderInterceptor');
  }
})();
