(function() {
  'use strict';

  angular.module('tc.services').factory('EmptyStateService', EmptyStateService);

  EmptyStateService.$inject = ['CONSTANTS'];

  function EmptyStateService(CONSTANTS) {
    var states = null;
    var domain = CONSTANTS.domain;
    _init();

    var service = {
      getState: getState
    };

    return service;

    function getState(stateName) {
      if (states[stateName]) {
        return states[stateName];
      }
      return null;
    }

    function _getUrl (path) {
      return "https://www." + domain + path;
    }

    function _getIOSUrl(path) {
      return "https://ios." + domain + path;
    }

    function _init() {
      states = {
        "dashboard-challenges": {
          title: "My Challenges",
          description: "You don't have any active challenges. Ready to find your next challenge?",
          helpLinks: [{
            title: "Explore Open Challenges",
            url: "/challenges/?pageIndex=1",
            cssClass: "find-challenges tc-btn tc-btn-s"
          }]
        },
        "dashboard-ios-community": {
          title: "iOS Community",
          description: "Earn iOS topcoder badges and exclusive access to iOS challenges, prizes and special community-related events.",
          helpLinks: [{
            title: "Participate",
            // clickHandler: "vm.registerUser",
            eventName: "IOS_REGISTER_USER",
            cssClass: "participate tc-btn tc-btn-s tc-btn-ghost"
          }, {
            title: "Learn More",
            url: _getIOSUrl("/"),
            cssClass: "learn-more"
          }]
        },
        "dashboard-challenges-never-participated": {
          title: "My Challenges",
          description: "Compete in challenges to learn new skills, win cash prizes and test yourself against the world's best",
          helpLinks: [ {
            title: "Get Started",
            url: _getUrl("/getting-started"),
            cssClass: "primary-cta tc-btn tc-btn-s"
          }, {
            title: "Find Challenges",
            url: _getUrl("/challenges/?pageIndex=1"),
            cssClass: "secondary-cta"
          }]
        },
        "my-challenges-active": {
          title: "Active Challenges",
          description: "You don't have any active challenges. Ready to find your next challenge?",
          helpLinks: [{
            title: "Explore Open Challenges",
            url: "/challenges/?pageIndex=1",
            cssClass: "find-challenges tc-btn tc-btn-s tc-btn-ghost"
          }]
        },
        "my-challenges-past": {
          title: "Past Challenges",
          description: "You have not participated in any challenges yet.",
          helpLinks: [{
            title: "Find Challenges",
            url: _getUrl("/challenges/?pageIndex=1"),
            cssClass: "find-challenges tc-btn tc-btn-s tc-btn-ghost"
          }, {
            title: "Learn More",
            url: _getUrl("/getting-started"),
            cssClass: "learn-more"
          }]
        },
        "my-srms-upcoming": {
          title: "Upcoming SRMs",
          description: "You don't have any upcoming SRM. Ready to find your next SRM?",
          helpLinks: [{
            title: "Explore Open SRMs",
            url: "/challenges/data?pageIndex=1",
            cssClass: "find-srms tc-btn tc-btn-s tc-btn-ghost"
          }]
        },
        "my-srms-past": {
          title: "Past SRMs",
          description: "You have not participated in any SRMs yet.",
          helpLinks: [{
            title: "Find SRMs",
            url: _getUrl("/challenges/data?pageIndex=1"),
            cssClass: "find-srms tc-btn tc-btn-s tc-btn-ghost"
          }, {
            title: "Learn More",
            url: _getUrl("/member-onboarding"),
            cssClass: "learn-more"
          }]
        },
        "my-challenges-never-participated": {
          title: "My Challenges",
          description: "Compete in challenges to win money, test yourself against the world's best, and learn new skills",
          helpLinks: [{
            title: "Find Challenges",
            url: _getUrl("/challenges/?pageIndex=1"),
            cssClass: "find-challenges tc-btn tc-btn-s tc-btn-ghost"
          }, {
            title: "Learn More",
            url: _getUrl("/getting-started"),
            cssClass: "learn-more"
          }]
        },
        "profile-empty": {
          title: "Beep. Beep. Hello!",
          description: "Seems like this member doesn’t have much information to share yet.",
          helpLinks: [{
            title: "View Other Members",
            url: _getUrl("/community/members"),
            cssClass: "find-members tc-btn tc-btn-s"
          }]
        },
        "profile-topcoder-activity": {
          title: "My Challenges",
          description: "You have not participated in any challenges yet.",
          helpLinks: [{
            title: "Explore Challenges",
            url: _getUrl("/challenges/?pageIndex=1"),
            cssClass: "find-challenges tc-btn tc-btn-s tc-btn-ghost"
          }, {
            title: "Learn More",
            url: _getUrl("/getting-started"),
            cssClass: "learn-more"
          }]
        },
        "profile-skills": {
          title: "Skills",
          description: "You can add languages, environments, frameworks, libraries, platforms, tools, and any other technologies that you know well.",
          helpLinks: [{
            title: "Add Your Skills",
            state: "settings.profile",
            cssClass: "add-skills tc-btn tc-btn-s tc-btn-ghost"
          }]
        },
        "profile-external-links": {
          title: "External Links",
          description: "Show off your work and experience outside of Topcoder. Connect accounts from popular services and networks or add a link to any site.",
          helpLinks: [{
            title: "Connect Your Accounts",
            state: "settings.profile",
            cssClass: "connect-external-accounts tc-btn tc-btn-s tc-btn-ghost"
          }]
        }
      }
    }
  };
})();
