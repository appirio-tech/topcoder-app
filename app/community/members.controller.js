(function() {
  'use strict';

  angular.module('tc.community').controller('MembersController', MembersController);

  MembersController.$inject = ['membersData', '$http', 'CONSTANTS'];

  function MembersController(membersData, $http, CONSTANTS) {

    this.notSearch = true;
    this.showing = 'list';
    this.domain = CONSTANTS.domain;
    this.currentMonth = 'October 2015';
    this.memberLeaderboard = membersData.data.memberLeaderboard;
    this.copilots = membersData.data.copilots;
    this.search = function() {
      if (this.keywords) {
        window.location.replace('/search?s=' + this.keywords + '&scope=member');

        //$http.get('community/mock-data/search-result.json')
        //    .success(function(data) {
        //        this.searchResult = data.result;
        //        this.notSearch = false;
        //    }.bind(this));
      } else {
        this.notSearch = true;
      }
    };
  }

})();
