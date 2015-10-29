(function() {
  'use strict';

  angular.module('tc.services').factory('IntroService', IntroService);

  IntroService.$inject = ['store', 'UserService', '$state', '$stateParams'];

  function IntroService(store, UserService, $state, $stateParams) {
    var service = {
      getIntroData: getIntroData,
      getCurrentPageOptions: getCurrentPageOptions
    };

    /////////////////

    function getIntroData(stateName) {
      // verfiy that state exists
      var stateData = _.get(_introJSData, stateName, null);

      if (!stateData) {
        return null;
      }

      var mergedData = _.clone(_introJSData['default'], true);
      mergedData = _.merge(mergedData, stateData);

      return mergedData;
    }

    function getCurrentPageOptions() {
      var userIdentity = UserService.getUserIdentity();

      if (userIdentity) {
        var userHandle = userIdentity.handle.toLowerCase();
        var userId = userIdentity.userId;

        var currentPage = $state.current.name;
        var handleInParams = $stateParams.userHandle ? $stateParams.userHandle.toLowerCase() : null;
        var userIntroJSStats = store.get(userId);

        if (!userIntroJSStats.dashboardIntroComplete && _.contains(currentPage, 'dashboard')) {
          userIntroJSStats.dashboardIntroComplete = true;
          store.set(userId, userIntroJSStats);

          return getIntroData(currentPage);
        }

        if (!userIntroJSStats.profileAboutIntroComplete && _.contains(currentPage, 'profile.about') && userHandle === handleInParams) {
          userIntroJSStats.profileAboutIntroComplete = true;
          store.set(userId, userIntroJSStats);

          return getIntroData(currentPage);
        }

        if (!userIntroJSStats.profileSubtrackIntroComplete && _.contains(currentPage, 'profile.subtrack') && userHandle === handleInParams && $stateParams.subTrack.toLowerCase() !== 'copilot') {
          userIntroJSStats.profileSubtrackIntroComplete = true;
          store.set(userId, userIntroJSStats);

          return getIntroData(currentPage);
        }
      }

      return null;
    }

    var _introJSData = {
      'default': {
        steps:[],
        showStepNumbers: false,
        exitOnOverlayClick: true,
        exitOnEsc: true,
        nextLabel: 'Next',
        prevLabel: 'Back',
        skipLabel: 'Skip',
        doneLabel: 'Finish'
      },
      profile: {
        about: {
          steps: [
            {
              intro: '<img src="/images/introjs/profile-skills.svg" /><p>Welcome to the new Topcoder Profile. It’s been reimagined as the premier place to showcase your experience, with three main sections.</p>'
            },
            {
              // element: '#skills',
              intro: '<img src="/images/introjs/profile-skills.svg" /><h1>Skills</h1><p>A quick way to understand your strengths. Skills include languages, environments, frameworks, libraries, platforms, tools, and any other technologies that you know well.</p>',
              position: 'top'
            },
            {
              // element: '#tcActivity',
              intro: '<img src="/images/introjs/profile-tc-activity.svg" /><h1>Activity on Topcoder</h1><p>See your active sub-track ratings and explore detailed statistics and past challenges</p>',
              position: 'top'
            },
            {
              // element: '#externalLinks',
              intro: '<img src="/images/introjs/profile-web-activity.svg" /><h1>Activity across the web</h1><p>Show off the best of your work and experience outside of Topcoder by connecting external accounts or adding links.</p>',
              position: 'top'
            }
          ]
        },
        subtrack: {
          steps: [
            {
              intro: '<img src="/images/introjs/subtrack-metrics.svg" /><p>Welcome to the new Sub-track Details page. This page summarizes your activity in a particular sub-track and has detailed historical metrics.</p>'
            },
            {
              // element: '#subtrack-stats',
              intro: '<img src="/images/introjs/subtrack-metrics.svg" /><h1>Basic metrics</h1><p>Understand your performance at a glance.</p>',
              position: 'bottom'
            },
            {
              // element: '#challenges-tab',
              intro: '<img src="/images/introjs/subtrack-challenges.svg" /><h1>Charts & in-depth statistics</h1><p>View charts and comprehensive metrics to get a granular understanding of the activity in this sub-track.</p>',
              position: 'top'
            },
            {
              // element: '#challenges-tab',
              intro: '<img src="/images/introjs/subtrack-statistics.svg" /><h1>Completed challenges</h1><p>View all the challenges you’ve successfully completed in this sub-track.</p>',
              position: 'top'
            }
          ]
        }
      },
      dashboard: {
        steps: [
          {
            intro: '<img src="/images/introjs/dashboard-challenges.svg" /><p>Welcome to your new Topcoder Dashboard. It’s been revamped to bring your most-needed information to the fore. Let’s walk through some of the new sections.</p>'
          },
          {
            // element: '#challenges',
            intro: '<img src="/images/introjs/dashboard-challenges.svg" /><h1>Your challenges</h1><p>See your active challenges in a grid or list. Find the main challenge information, such as phase or action required, and click to go to the challenge details.</p>',
            position: 'top'
          },
          {
            // element: '#srms',
            intro: '<img src="/images/introjs/dashboard-srms.svg" /><h1>Single round matches</h1><p>Keep track of upcoming Single Round Matches and easily find links to past problems, match editorials, and the Arena.</p>',
            position: 'top'
          },
          {
            // element: '#community',
            intro: '<img src="/images/introjs/dashboard-community.svg" /><h1>Community updates</h1><p>Don’t miss the latest happenings in our community. Events, member programs, fun challenges, and more!</p>',
            position: 'top'
          }
        ]
      }
    };

    return service;
  }
})();
