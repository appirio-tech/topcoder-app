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
        controller: 'DashboardCtrl as db',
        data: {
          authRequired: true,
          title: 'Dashboard'
        }
      },
      'dashboard': {
        url: '/my-dashboard',
        parent: 'baseDashboard',
        //controller: 'dashboard as db',
        data: {
          authRequired: true,
        },
        views: {
          'my-challenges-widget': {
            templateUrl: "member-dashboard/my-challenges/my-challenges.html",
            controller: 'MyChallengesCtrl',
            controllerAs: 'vm'
          },
          'srms-widget' :{
            templateUrl : 'member-dashboard/upcoming-srms/upcoming-srms.html',
            controller: 'UpcomingSRMsCtrl',
            controllerAs: 'vm'
          },
          'member-program-widget' : {
            templateUrl : 'member-dashboard/member-program/member-program.html',
            controller: 'MemberProgramCtrl',
            controllerAs: 'vm'
          },
          'helpful-links-widget' : {
            templateUrl : 'member-dashboard/helpful-links/helpful-links.html',
            controller: 'HelpfulLinksCtrl',
            controllerAs: 'vm'
          },
          'subscribe-updates-widget' : {
            templateUrl : 'member-dashboard/subscribe-updates/subscribe-updates.html',
            controller: 'SubscribeUpdatesCtrl',
            controllerAs: 'vm'
          },
          'blog-post-widget' : {
            templateUrl : 'member-dashboard/blog-post/blog-feed.html',
            controller: 'BlogPostCtrl',
            controllerAs: 'vm'
          },
          'profile-header-widget' : {
            templateUrl : 'member-dashboard/member-profile/welcome-back.html',
            controller: 'WelcomeBackCtrl',
            controllerAs: 'vm'
          },
          'marketing-message-widget' : {
            templateUrl : 'member-dashboard/marketing-message/marketing-message.html',
            controller: 'MarketingMessageCtrl',
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
