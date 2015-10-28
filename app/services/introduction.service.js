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
              // element: '#skills',
              intro: 'The quickest way to understand a member’s skills. It includes languages, environments, frameworks, libraries, platforms, tools, and any other technologies that the members knows well.',
              position: 'top'
            },
            {
              // element: '#tcActivity',
              intro: 'See the active sub-tracks and click on them for ratings, charts, history and even more details.',
              position: 'top'
            },
            {
              // element: '#externalLinks',
              intro: 'View the best of your presence on the web: show off your work and experience outside of Topcoder by connecting accounts or adding links.',
              position: 'top'
            }
          ]
        },
        subtrack: {
          steps: [
            {
              intro: 'Welcome to the new Sub-track details page. This page contains activity in this track, in-depth metrics and history in an easy-to-understand way.'
            },
            {
              // element: '#subtrack-stats',
              intro: 'Find the most important metrics here to understand performance in a glance.',
              position: 'bottom'
            },
            {
              // element: '#challenges-tab',
              intro: 'View all the successfully completed challenges for the member in this sub-track.',
              position: 'top'
            },
            {
              // element: '#challenges-tab',
              intro: 'View charts and more in-depth metrics to get a very granular understanding of the activity in this sub-track.',
              position: 'top'
            }
          ]
        }
      },
      dashboard: {
        steps: [
          {
            intro: 'Welcome to the your new Topcoder Dashboard. We have revamped the dashboard to bring to fore the information that matters to you. Lets walk through some of the new features.'
          },
          {
            // element: '#metrics',
            intro: 'Quickly glance your active challenges and money earned, and click on them to see more in detail.',
            position: 'bottom'
          },
          {
            // element: '#stats',
            intro: 'Keep on top of how you are faring vs rest of the community with the rating here.',
            position: 'top'
          },
          {
            // element: '#challenges',
            intro: 'View your active challenges on the dashboard in a grid or list view.  You can find the phase, and activity on here, or can click on them to go to the challenge details.',
            position: 'top'
          },
          {
            // element: '#srms',
            intro: 'Keep track of the SRMs being scheduled, and find easy links to past problems, editorial and the Arena.',
            position: 'top'
          },
          {
            // element: '#community',
            intro: 'Don’t miss out on the latest happenings in our community. Blogs, Events, Member Programs and more!',
            position: 'top'
          }
        ]
      }
    };

    return service;
  }
})();
