(function () {
  'use strict';

  angular.module('tc.profile').controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['$scope', 'CONSTANTS', '$log',
    'TcAuthService', 'UserService', 'ProfileService', 'ChallengeService',
    'userHandle', 'profile', 'ngDialog'
  ];

  function ProfileCtrl($scope, CONSTANTS, $log, TcAuthService, UserService, ProfileService, ChallengeService, userHandle, profile, ngDialog) {
    var vm = this;
    // set profile to the object that was resolved
    vm.profile = profile;
    vm.userHandle = userHandle;
    vm.showBadges = showBadges;

    // spinnerssss
    $log.debug()
    vm.status = {
      'badges': CONSTANTS.STATE_LOADING,
      'stats': CONSTANTS.STATE_LOADING,
      'skills': CONSTANTS.STATE_LOADING,
      'externalLinks': CONSTANTS.STATE_READY,
      'pastChallenges': CONSTANTS.STATE_LOADING
    };

    activate();

    // adding stats promise on scope so child states can use this.
    vm.statsPromise = ProfileService.getUserStats(vm.userHandle).then(function(stats) {
      vm.stats = stats;
      vm.profile.tracks = vm.profile.tracks || ProfileService.getTracks(vm.stats) || [];
      vm.numProjects = ProfileService.getNumProjects(vm.stats);
      vm.numWins = ProfileService.getNumWins(vm.stats);
      vm.categories = ProfileService.getRanks(vm.stats);
      vm.status.stats = CONSTANTS.STATE_READY;
      return vm.stats;
    }).catch(function(err) {
      $log.error(err);
      vm.status.stats = CONSTANTS.STATE_ERROR;
    });

    vm.pastChallengesPromise = ChallengeService.getUserChallenges(profile.userId, {orderBy: 'submissionenddate desc', status: 'complete'})
    .then(function(data) {
      vm.status.pastChallenges = CONSTANTS.STATE_READY;
      vm.pastChallenges = data;
      return data;
    }).catch(function(err) {
      vm.status.stats = CONSTANTS.STATE_ERROR;
    });

    // skills
    vm.skillsPromise = ProfileService.getUserSkills(vm.userHandle).then(function(skills) {
      vm.skills = skills.skills;
      vm.status.skills = CONSTANTS.STATE_READY;
    }).catch(function(err) {
      vm.status.skills = CONSTANTS.STATE_ERROR;
    });

    function activate() {
      $log.debug('Calling ProfileController activate()');
      // show edit profile link if user is authenticated and is viewing their own profile
      if (TcAuthService.isAuthenticated() && UserService.getUserIdentity().username == vm.userHandle) {
        vm.showEditProfileLink = true;
      } else {
        vm.showEditProfileLink = false;
      }
      if (profile.createdAt) {
        vm.tenure = moment().isoWeekYear() - moment(profile.createdAt).isoWeekYear();
      } else {
        vm.tenure = false;
      }

    }

    function showBadges() {
      ngDialog.open({
        template: 'profile/badges/badges.html',
        controller: 'BadgesController',
        controllerAs: 'vm',
        className: 'ngdialog-theme-default'
      });
    }
  }
})();
