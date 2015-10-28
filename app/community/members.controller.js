(function() {
  'use strict';

  angular.module('tc.community').controller('MembersController', MembersController);

  MembersController.$inject = ['CommunityDataService', 'CONSTANTS'];

  function MembersController(CommunityDataService, CONSTANTS) {
    var ctrl = this;
    ctrl.notSearch = true;
    ctrl.showing = 'list';
    ctrl.domain = CONSTANTS.domain;
    ctrl.currentMonth = 'October 2015';
    ctrl.memberLeaderboard = [];
    ctrl.copilots = [];
    CommunityDataService.getMembersData()
      .then(function(data) {
        ctrl.memberLeaderboard = data.memberLeaderboard;
        ctrl.copilots = data.copilots;
      });

    ctrl.search = function() {
      if (ctrl.keywords) {
        window.location.replace('/search?s=' + ctrl.keywords + '&scope=member');
      } else {
        ctrl.notSearch = true;
      }
    };
  }

})();
