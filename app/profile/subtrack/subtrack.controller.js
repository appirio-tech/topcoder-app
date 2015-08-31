(function () {

  angular
    .module('tc.profile')
    .controller('ProfileSubtrackController', ProfileSubtrackController);

  ProfileSubtrackController.$inject = ['$scope', 'ProfileService', '$q', '$stateParams', 'ChallengeService', 'CONSTANTS', '$state', '$window'];

  function ProfileSubtrackController($scope, ProfileService, $q, $stateParams, ChallengeService, CONSTANTS, $state, $window) {
    var vm = this;
    vm.subTrack = decodeURIComponent($stateParams.subTrack || '') || '';
    vm.track = $stateParams.track;
    vm.viewing = 'challenges';
    vm.domain = CONSTANTS.domain;
    vm.challenges = [];
    var profileVm = $scope.$parent.profileVm;
    vm.dropdown = [];
    vm.ddSelected = {};
    vm.selectSubTrack = selectSubTrack;
    vm.back = back;
    vm.status = {
      'challenges': CONSTANTS.STATE_LOADING
    };
    vm.offset = 0;
    // maximum number of challenges to be shown on the page
    vm.limit = 2;
    // actual number of challenges shown on the page
    vm.count = 0;
    // total number of challenges available for the current filters
    vm.totalCount = 0;
    vm.nextPage = nextPage;
    vm.prevPage = prevPage;
    // flag holding the state of visibility of next pager
    vm.nextPageAvailable = false;
    // flag holding the state of visibility of previous pager
    vm.prevPageAvailable = false;

    activate();

    function activate() {
      profileVm.statsPromise.then(function(data) {
        vm.typeStats = ProfileService.getChallengeTypeStats(
          profileVm.stats,
          vm.track,
          vm.subTrack.toLowerCase().replace(/ /g, '')
        );
        if (vm.subTrack) {
          vm.dropdown = ProfileService.getSubTracks(profileVm.stats, vm.track.toLowerCase())
          .map(function(subtrack) {
            return {
              text: vm.track + ': ' + subtrack,
              value: subtrack
            };
          });
          vm.ddSelected = vm.dropdown.filter(function(selection) {
            return selection.value === vm.subTrack;
          })[0];
        } else {
          vm.ddSelected =  {
            text: 'Co-Pilot',
            value: 'Co-Pilot'
          };
        }

      });

      _getChallenges();
    }

    function selectSubTrack(subTrack) {
      $state.go('profile.subtrack', {track: vm.track, subTrack: subTrack});
    }

    function back() {
      $window.history.back();
    }

    function nextPage() {
      vm.offset += vm.limit;
      _getChallenges();
    }

    function prevPage() {
      vm.offset -= vm.limit;
      _getChallenges();
    }

    /**
     * Helper method to validate the pager state.
     */
    function _validatePager() {
      if (vm.count + vm.offset >= vm.totalCount) {
        vm.nextPageAvailable = false;
      } else {
        vm.nextPageAvailable = true;
      }
      if (vm.offset <= 0) {
        vm.prevPageAvailable = false;
      } else {
        vm.prevPageAvailable = true;
      }
    }

    function _getChallenges() {
      vm.status.challenges = CONSTANTS.STATE_LOADING;
      return vm.pastChallengesPromise = ChallengeService.getUserChallenges(
        profileVm.profile.handle,
        {
          filter: {
            status: 'completed',
            track: vm.track,
            subTrack: vm.subTrack
          },
          limit: vm.limit,
          offset: vm.offset,
          orderBy: 'submissionEndDate desc'
        }
      )
      .then(function(data) {
        vm.challenges = data;
        vm.status.challenges = CONSTANTS.STATE_READY;
        vm.count = vm.challenges.length;
        vm.totalCount = vm.challenges.metadata.totalCount;
        _validatePager();
        return data;
      }).catch(function(err) {
        vm.status.challenges = CONSTANTS.STATE_ERROR;
      });
    }

  }


})();
