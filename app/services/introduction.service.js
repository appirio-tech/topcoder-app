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
        showStepNumbers: true,
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
              intro: 'Welcome to the new Topcoder Profile. To make this the premier place to showcase skills, we have reimagined this page and introduced several new features.'
            },
            {
              element: '#skills',
              intro: 'The quickest way to understand a member’s skills. It includes languages, environments, frameworks, libraries, platforms, tools, and any other technologies that you know well.',
              position: 'top'
            },
            {
              element: '#tcActivity',
              intro: 'Topcoder activity, ratings and other statistics now live in this section. See the active sub-tracks and click on them for even more details and history.',
              position: 'top'
            },
            {
              element: '#externalLinks',
              intro: 'Best of member’s presence on the web will be highlighted here. Show off your work and experience outside of Topcoder by connecting accounts or adding links.',
              position: 'top'
            }
          ]
        },
        subtrack: {
          steps: [
            {
              intro: 'Welcome to the new Sub-track details page. This page contains activity in this track and in-depth metrics in an easy-to-understand way.'
            },
            {
              element: '#subtrack-stats',
              intro: 'Find the most important metrics here to understand performance in a glance. You can scroll below to see charts and more in-depth metrics to get a very granular understanding of the activity in this subtrack.',
              position: 'bottom'
            },
            {
              element: '#challenges-tab',
              intro: 'This sections contains all the completed challenges, in order of success.',
              position: 'top'
            }
          ]
        }
      },
      dashboard: {
        steps: [
          {
            intro: 'Welcome to your new Topcoder Dashboard. We have revamped the dashboard to bring to fore the information that matters to you. Let us walk you through some of the new things to help you keep on top of your Topcoder activity.'
          },
          {
            element: '#metrics',
            intro: 'Quickly glance your active challenges and money earned, and click on them to see more in detail.',
            position: 'bottom'
          },
          {
            element: '#stats',
            intro: 'Keep on top of how you are faring vs rest of the community with the rating here.',
            position: 'top'
          },
          {
            element: '#challenges',
            intro: 'All your active challenges can be found here. See the phase, and activity on here, or click on them to go to the challenge details. You can view these in a grid or list view.',
            position: 'top'
          },
          {
            element: '#viewAllChallenges',
            intro: 'Want to see more of the challenges? Or look up a past one? Click on the buttons here to see all of your challenges.',
            position: 'top'
          },
          {
            element: '#srms',
            intro: 'Keep track of the SRMs being scheduled, and find easy links to past problems, editorial and the Arena.',
            position: 'top'
          },
          {
            element: '#community',
            intro: 'Don’t miss out on the latest happenings in our community. Blogs, Events, Member Programs and more!',
            position: 'top'
          }
        ]
      }
    };

    return service;
  }
})();
