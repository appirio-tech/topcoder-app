(function () {

  angular
    .module('tc.profile')
    .controller('ProfileSubtrackController', ProfileSubtrackController);

  ProfileSubtrackController.$inject = ['$scope', 'ProfileService', '$q', '$stateParams', 'ChallengeService', 'SRMService', 'CONSTANTS', '$state', '$window', 'ngDialog', 'UserStatsService'];

  function ProfileSubtrackController($scope, ProfileService, $q, $stateParams, ChallengeService, SRMService, CONSTANTS, $state, $window, ngDialog, UserStatsService) {
    var vm = this;
    vm.ASSET_PREFIX = CONSTANTS.ASSET_PREFIX;
    vm.graphState = { show: 'history' };
    vm.subTrack = decodeURIComponent($stateParams.subTrack || '') || '';
    vm.track = $stateParams.track;
    vm.viewing = 'stats';
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
    vm.subTrackStats = [];

    vm.pageName = vm.subTrack.toLowerCase().replace(/_/g, ' ');

    vm.tabs = ['statistics'];

    if (vm.track !== 'COPILOT') {
      vm.tabs.push( vm.subTrack === 'SRM' ? 'Past srm': 'challenges');
    }

    vm.status = {
      'challenges': CONSTANTS.STATE_LOADING
    };
    // paging params, these are updated by tc-pager
    vm.pageParams = {
      currentOffset : 0,
      limit: 16,
      currentCount: 0,
      totalCount: 0,
      // counter used to indicate page change
      updated: 0
    };

        // make sure track and subtrack are set
    if (!$stateParams.track || !$stateParams.subTrack) {
      // redirect to main profile
      $state.go('profile.about', {userHandle: $stateParams.userHandle});
    } else {
      activate();
    }

    function activate() {
      if (vm.track == 'DEVELOP' || vm.track == 'DATA_SCIENCE') {
        vm.distributionPromise = ProfileService.getDistributionStats(vm.track, vm.subTrack);
        vm.distributionPromise.then(function(data) {
          vm.distribution = _.get(data, 'distribution', {});
        });
        var historyDeferred = $q.defer();
        vm.historyPromise = historyDeferred.promise;
        ProfileService.getHistoryStats(profileVm.profile.handle).then(function(data) {
          if (data.handle) {
            vm.history = _.get(ProfileService.getChallengeTypeStats(data, vm.track, vm.subTrack), 'history', null);
            historyDeferred.resolve(vm.history);
          }
        });
      }

      profileVm.statsPromise.then(function(data) {

        // user iterable stats
        vm.subTrackStats = UserStatsService.getIterableStats(vm.track, vm.subTrack, data);
        if (vm.track === 'DEVELOP') {
          var reliability = vm.subTrackStats.filter(function(stat) { return stat.label === 'reliability'; });
          if (reliability.length > 0) {
            reliability = reliability[0];
            reliability.link = 'http://community.' + vm.domain + '/tc?module=ReliabilityDetail&pt=' + UserStatsService.mapReliability(vm.subTrack) + '&cr=' + profileVm.profile.userId;
          }
          var mustHaveMetrics = ["rank", "rating", "reliability"];
          // check if rating, rank & reliability are all set
          var _filteredObjs = _.filter(vm.subTrackStats, function(k) { return _.indexOf(mustHaveMetrics, k.label) > -1});
          if (_.all(_.pluck(_filteredObjs, 'val'), function(v) { return !v})) {
            // all false filter em out
            _.remove(vm.subTrackStats, function(k) { return _.indexOf(mustHaveMetrics, k.label) > -1});
          }
        }

        if (vm.subTrack == 'SRM') {
          vm.divisions = ProfileService.getDivisions(profileVm.stats);
          vm.divisionList = [
            vm.divisions.division1,
            vm.divisions.division2,
          ];
          vm.divisionName = ['DIVISION 1', 'DIVISION 2'];
          vm.challengesSRM = vm.divisions.challenges;
          if (
            (vm.divisions.division1.levels && vm.divisions.division1.levels.length) ||
            (vm.divisions.division2.levels && vm.divisions.division2.levels.length) ||
            (vm.divisions.challenges.levels && vm.divisions.challenges.levels.length)
          ) vm.SRMDetailDisplay = true;
        }

        vm.typeStats = ProfileService.getChallengeTypeStats(
          profileVm.stats,
          vm.track,
          vm.subTrack.toLowerCase().replace(/ /g, '')
        );

        vm.nonRated = vm.typeStats && vm.typeStats.rank && !vm.typeStats.rank.rating && !vm.typeStats.rank.overallRank && !vm.typeStats.rank.reliability;


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
      $scope.$watch('vm.pageParams.updated', function(newValue, oldValue) {
        if (newValue !== oldValue) {
          _getChallenges();
        }
      });
      // initial call unless it's copilot
      if (vm.track !== 'COPILOT') {
        _getChallenges();
      }
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
        offset: vm.pageParams.currentOffset,
      };
      if (vm.track.toUpperCase() === 'DATA_SCIENCE') {
        if (vm.subTrack.toUpperCase() === 'SRM') {
          // _challengePromise = SRMService.getSRMs()
          params['filter'] = "status=past&isRatedForSRM=true";
          return SRMService.getUserSRMs(profileVm.profile.handle, params)
          .then(function(data) {
            vm.pageParams.totalCount = data.metadata.totalCount;
            vm.challenges = vm.challenges.concat(data);
            vm.pageParams.currentCount = vm.challenges.length;

            // sort SRMs by points
            vm.challenges.sort(function(a, b) {
              // if both SRMs have finalPoints details
              var aHasFP;
              var bHasFP;
              if (
                (aHasFP = a.rounds[0] && a.rounds[0].userSRMDetails && a.rounds[0].userSRMDetails.finalPoints)
                &&
                (bHasFP = b.rounds[0] && b.rounds[0].userSRMDetails && b.rounds[0].userSRMDetails.finalPoints)
              ) {
                // sort descending
                return b.rounds[0].userSRMDetails.finalPoints - a.rounds[0].userSRMDetails.finalPoints;
              } else if (bHasFP) {
                // if b has FP, b should go first
                return 1;
              } else if (aHasFP) {
                return -1;
              } else {
                return 0;
              }
            });
            vm.status.challenges = CONSTANTS.STATE_READY;
          })
          .catch(function(resp) {
            vm.status.challenges = CONSTANTS.STATE_ERROR;
          });
        } else {
          params['filter'] = "status=past&isRatedForMM=true";
          params['orderBy'] ='endDate desc';
          return ChallengeService.getUserMarathonMatches(profileVm.profile.handle, params)
          .then(function(data) {
            vm.pageParams.totalCount = data.metadata.totalCount;
            vm.pageParams.currentCount = vm.challenges.length;
            vm.challenges = vm.challenges.concat(data);
            vm.status.challenges = CONSTANTS.STATE_READY;
          })
          .catch(function(resp) {
            vm.status.challenges = CONSTANTS.STATE_ERROR;
          });
        }
      } else {
        params['filter']= 'status=completed&hasUserSubmittedForReview=true&track=' + vm.track + '&subTrack=' + vm.subTrack;
        params['orderBy'] ='submissionEndDate desc';
        return ChallengeService.getUserChallenges(profileVm.profile.handle, params)
        .then(function(data) {
          ChallengeService.processPastChallenges(data);
          vm.pageParams.totalCount = data.metadata.totalCount;
          vm.challenges = vm.challenges.concat(data);
          vm.pageParams.currentCount = vm.challenges.length;
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
