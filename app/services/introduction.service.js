(function() {
  'use strict';

  angular.module('tc.services').factory('IntroService', IntroService);

  IntroService.$inject = [];
  var _data = {
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
        subTrack: {
          steps: [
            {
              intro: 'Welcome to the new Sub-track details page. This page contains activity in this track and in-depth metrics in an easy-to-understand way.'
            },
            {
              element: '#metrics',
              intro: 'Find the most important metrics here to understand performance in a glance.',
              position: 'top'
            },
            {
              element: '#challenges',
              intro: 'This sections contains all the completed challenges, in order of success.',
              position: 'top'
            },
            {
              element: '#stats',
              intro: 'This sections contains charts and more in-depth metrics to get a very granular understanding of the activity in this sub-track.',
              position: 'top'
            }
            // {
            //   element: '#navigation',
            //   intro: 'And finally, go from one active sub-track to another by opening the profile navigation here',
            //   position: 'bottom'
            // }
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

  function IntroService() {
    var service = {
      getIntroData: getIntroData
    };

    return service;

    /////////////////

    function getIntroData(stateName) {
      // verfiy that state exists
      var stateData = _.get(_data, stateName, null);

      if (!stateData) {
        return null;
      }

      var mergedData = _.clone(_data['default'], true);
      mergedData = _.merge(mergedData, stateData);

      return mergedData;
    }
  }
})();
