(function () {

  angular
    .module('tc.profile')
    .controller('ProfileSubtrackController', ProfileSubtrackController);

  ProfileSubtrackController.$inject = ['$scope', 'ProfileService', '$q', '$stateParams', 'ChallengeService', 'SRMService', 'CONSTANTS', '$state', '$window', 'ngDialog'];

  function ProfileSubtrackController($scope, ProfileService, $q, $stateParams, ChallengeService, SRMService, CONSTANTS, $state, $window, ngDialog) {
    var vm = this;
    vm.graphState = { show: 'history' };
    vm.subTrack = decodeURIComponent($stateParams.subTrack || '') || '';
    vm.track = $stateParams.track;
    vm.viewing = 'challenges';
    vm.domain = CONSTANTS.domain;
    vm.challenges = [];
    var profileVm = $scope.$parent.profileVm;
    vm.userHandle = profileVm.profile.handle;
    vm.dropdown = [];
    vm.ddSelected = {};
    vm.distribution = {};
    vm.selectSubTrack = selectSubTrack;
    vm.showNav = showNav;
    vm.back = back;
    vm.status = {
      'challenges': CONSTANTS.STATE_LOADING
    };
    // paging params, these are updated by tc-pager
    vm.pageParams = {
      offset : 0,
      limit: 10,
      count: 0,
      totalCount: 0,
      // counter used to indicate page change
      updated: 0
    };

    activate();

    function activate() {
      if (vm.subTrack == 'SRM') {
        vm.graphState = { show: 'distribution' };
      }
      if (vm.track == 'DEVELOP' || vm.track == 'DATA_SCIENCE') {
        vm.distributionPromise = ProfileService.getDistributionStats(vm.track, vm.subTrack);
        vm.distributionPromise.then(function(data) {
          vm.distribution = data.distribution;
        });
        var historyDeferred = $q.defer();
        vm.historyPromise = historyDeferred.promise;
        ProfileService.getHistoryStats(profileVm.profile.handle).then(function(data) {
          if (data.handle) {
            vm.history = ProfileService.getChallengeTypeStats(data, vm.track, vm.subTrack).history;
            historyDeferred.resolve(vm.history);
          }
        });
      }

      profileVm.statsPromise.then(function(data) {
        if (vm.subTrack == 'SRM') {
          vm.divisions = ProfileService.getDivisions(profileVm.stats);
          vm.divisionList = [
            vm.divisions.division1,
            vm.divisions.division2,
            vm.divisions.challenges
          ];
          console.log(vm.divisionList);
        }
        vm.typeStats = ProfileService.getChallengeTypeStats(
          profileVm.stats,
          vm.track,
          vm.subTrack.toLowerCase().replace(/ /g, '')
        );
        console.log(vm.typeStats);
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

      // watches page change counter to reload the data
      $scope.$watch('vm.pageParams.updated', function(updatedParams) {
        _getChallenges();
      });
      _getChallenges();
    }

    function selectSubTrack(subTrack) {
      $state.go('profile.subtrack', {track: vm.track, subTrack: subTrack});
    }

    function back() {
      $window.history.back();
    }

    function _getChallenges() {
      vm.status.challenges = CONSTANTS.STATE_LOADING;
      var params = {
        limit: vm.pageParams.limit,
        offset: vm.pageParams.offset,
      };
      if (vm.track.toUpperCase() === 'DATA_SCIENCE') {
        if (vm.subTrack.toUpperCase() === 'SRM') {
          // _challengePromise = SRMService.getSRMs()
          params['filter'] = "status=past";
          return SRMService.getPastSRMs(profileVm.profile.handle, params)
          .then(function(data) {
            vm.challenges = data;
            vm.status.challenges = CONSTANTS.STATE_READY;
          })
          .catch(function(resp) {
            vm.status.challenges = CONSTANTS.STATE_ERROR;
          });
        } else {
          params['filter'] = "status=past";
          // params['orderBy'] ='submissionEndDate desc';
          return ChallengeService.getUserMarathonMatches(profileVm.profile.handle, params)
          .then(function(data) {
            vm.challenges = data;
            vm.status.challenges = CONSTANTS.STATE_READY;
          })
          .catch(function(resp) {
            vm.status.challenges = CONSTANTS.STATE_ERROR;
          });
        }
      } else {
        params['filter']= 'status=completed&track=' + vm.track + '&subTrack=' + vm.subTrack;
        params['orderBy'] ='submissionEndDate desc';
        return ChallengeService.getUserChallenges(profileVm.profile.handle, params)
        .then(function(data) {
          ChallengeService.processPastChallenges(data);
          vm.challenges = data.filter(function(challenge) {
            return challenge.userDetails.hasUserSubmittedForReview;
          });
          vm.status.challenges = CONSTANTS.STATE_READY;
          return data;
        }).catch(function(err) {
          vm.status.challenges = CONSTANTS.STATE_ERROR;
        });
      }
    }

    function showNav() {
      ngDialog.open({
        template: 'profile/subtrack/nav.html',
        controller: 'ProfileCtrl',
        controllerAs: 'vm',
        className: 'ngdialog-theme-default',
        resolve: {
          userHandle: function() {
            return vm.userHandle;
          },
          profile: function() {
            return profileVm.profile;
          }
        }
      });
    }

  }


})();
