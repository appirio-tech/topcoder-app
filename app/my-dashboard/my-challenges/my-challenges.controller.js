(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('MyChallengesController', MyChallengesController);

  MyChallengesController.$inject = ['ChallengeService', 'UserService', '$q', '$log'];

  function MyChallengesController(ChallengeService, UserService, $q, $log) {
    var vm = this;
    vm.loading = true;
    vm.myChallenges = [];

    vm.viewActiveChallenges = viewActiveChallenges;
    vm.viewPastChallenges = viewPastChallenges;

    var activate = function() {
      viewActiveChallenges();
    }

    var userId = UserService.getUserIdentity().userId;

    // get ACTIVE challenges & marathon matches
    var getChallenges = function(status, orderBy) {
      vm.loading = true;
      ChallengeService.getChallenges({
        limit: 10,
        offset: 0,
        orderBy: orderBy, // TODO verify if this is the correct sort order clause,
        filter: "userId="+userId+"&status="+status
      }).then(function(data){
        vm.myChallenges = data;
        vm.loading = false;
      }, function(resp) {
        $log.error(resp);
        // TODO - handle error
      });
    }

    function viewActiveChallenges() {
      vm.myChallenges = [];
      getChallenges('Active', 'submissionEndDate asc');
    };

    function viewPastChallenges() {
      vm.myChallenges = [];
      getChallenges('Completed', 'submissionEndDate asc');
    };

    activate();

    ////////////// DEPRECATE ///////////////
    // Fetches user's active challenges from the API
    function _getChallenges() {
      initPaging();

      var chlngRequest = {
        listType: vm.listType,
        pageIndex: vm.pageIndex,
        pageSize: vm.pageSize,
        sortColumn: vm.sortColumn,
        sortOrder: vm.sortOrder
      };
      var mmRequest = {
        listType: vm.listType,
        sortColumn: vm.sortColumn,
        sortOrder: vm.sortOrder
      };
      console.log(db.loggedInUser);
      if(db.loggedInUser) {
        chlngRequest['userId'] = mmRequest['userId'] = db.loggedInUser.uid;
      }
      // show loading icon
      vm.loading = true;
      // Fetch challenges promise
      var chlngPromise = ChallengeService.getMyActiveChallenges(chlngRequest);
      // var mmPromise = ChallengeService.getMyMarathonMatches(mmRequest);
      $q.all([chlngPromise]) // add mmPromise to the array when end point works
        .then(function(responses) {
          vm.myChallenges = responses[0];
          // var mmData = responses[1];
          // processChallengesResponse(chlngData);
          //processMarathonMatchesResponse(mmData);
          // stop loading icon
          vm.loading = false;
          vm.renderWidget = vm.myChallenges && vm.myChallenges.length > 0;
      });
    }

    // Fetches user's active challenges from the API
    function getMarathonMatches() {
      var searchRequest = {
        listType: vm.mm.listType,
        sortColumn: vm.sortColumn,
        sortOrder: vm.sortOrder
      };
      // show loading icon
      vm.loading = true;
      // Fetch my active
      ChallengeService.getMyMarathonMatches(searchRequest)
        .then(function(data) {
          console.log(data);
          processMarathonMatchesResponse(data);
          console.log(vm.myChallenges);
          // stop loading icon
          vm.loading = false;
          vm.renderWidget = vm.myChallenges && vm.myChallenges.length > 0;
      });
    }

    function processMarathonMatchesResponse(data) {
      if (data.pagination) {
        vm.totalPages = Math.ceil(data.pagination.total / vm.pageSize);
        vm.totalRecords = data.pagination.total;
        vm.firstRecordIndex = (vm.pageIndex - 1) * vm.pageSize + 1;
        vm.lastRecordIndex = vm.pageIndex * vm.pageSize;
        vm.lastRecordIndex = vm.lastRecordIndex > vm.totalRecords ? vm.totalRecords : vm.lastRecordIndex;
      }
      vm.myChallenges = data;
      // uncomment following line when API supports paging
      // vm.visibleChallenges = data;
      // remove following line when API supports paging
      vm.visibleChallenges = data.slice(vm.firstRecordIndex - 1, vm.lastRecordIndex);
    }

    function processChallengesResponse(data) {
      if (data.pagination) {
        vm.totalPages = Math.ceil(data.pagination.total / vm.pageSize);
        vm.totalRecords = data.pagination.total;
        vm.firstRecordIndex = (vm.pageIndex - 1) * vm.pageSize + 1;
        vm.firstRecordIndex = vm.view == 'tiles' ? 1 : vm.firstRecordIndex;
        vm.lastRecordIndex = vm.pageIndex * vm.pageSize;
        vm.lastRecordIndex = vm.lastRecordIndex > vm.totalRecords ? vm.totalRecords : vm.lastRecordIndex;
      }
      if (vm.view == 'tiles') {
        vm.myChallenges = vm.myChallenges.concat(data);
      } else {
        vm.myChallenges = data;
      }
      angular.forEach(vm.myChallenges, function(challenge) {
        // challenge = challenge.data;
        var now = moment();
        var registrationDate = moment(challenge.registrationEndDate);
        var submissionDate = moment(challenge.submissionEndDate);
        challenge.currentPhaseRemainingTime = challenge.currentPhaseRemainingTime/(24*60*60);
        challenge.registrationClosed = now > registrationDate ? true : false;
        challenge.submissionClosed = now > submissionDate ? true : false;
        challenge.registrationTimeLeft = (registrationDate - now)/(24*60*60*1000);
        challenge.submissionTimeLeft = (submissionDate - now)/(24*60*60*1000);
        if (challenge.challengeCommunity == 'design') {
          challenge.community = 'UI Design';
        } else if (challenge.challengeCommunity == 'develop') {
          challenge.community = 'Development';
        }
        challenge.phaseMsg = preparePhaseMessage(challenge);
        // TODO create msg dynamically
        challenge.memberStatusMsg = 'You are registered!';
      });
      // uncomment following line when API supports paging
      // vm.visibleChallenges = data;
      // remove following line when API supports paging
      vm.visibleChallenges = vm.myChallenges.slice(vm.firstRecordIndex - 1, vm.lastRecordIndex);
    }

    function preparePhaseMessage(challenge) {
      if (challenge.status.toLowerCase() == 'completed') {
        return "Challenge Complete";
      }
      if (challenge.currentPhaseName.toLowerCase() == 'stalled') {
        return "Challenge Stalled";
      }
      if (challenge.currentPhaseName.toLowerCase() == 'cancelled') {
        return "Challenge Cancelled";
      }
      if (challenge.currentPhaseRemainingTime < 0
        && challenge.status.toLowerCase() == 'active') {
        return challenge.currentPhaseName + " Phase Late";
      }
      return challenge.currentPhaseName + " Phase Ends";
    }

    /**
     * changePage changes page in the result set
     *
     * @param {JSON} pageLink page link object
     *
     * @return {Object} promise of API call with updated pageIndex
     */
    function changePage(pageLink) {
      vm.pageIndex = pageLink.val;
      getChallenges();
    }

    /**
     * isCurrentPage checks if the give page link is the current page
     *
     * @param {JSON} pageLink page link object
     *
     * @return {Boolean} true if the given page is the current page, false otherwise
     */
    function isCurrentPage (pageLink) {
      return pageLink.val === vm.pageIndex;
    }

    /**
     * getCurrentPageClass Identifies the css class to be used for the given page link
     *
     * @param {JSON} pageLink page link object
     *
     * @return {String}
     */
    function getCurrentPageClass(pageLink) {
      return isCurrentPage(pageLink) ? 'current-page' : '';
    }

    /**
     * sort sorts the results based on the given column
     *
     * @param {String} column page link object
     *
     * @return {Object} promise of API call with updated sort params
     */
    function sort(column) {
      if (vm.sortColumn === column) {
        vm.sortOrder = vm.sortOrder === 'desc' ? 'asc' : 'desc';
      } else {
        vm.sortOrder = 'desc';
      }
      vm.sortColumn = column;
      getChallenges();
    }

    /**
     * initPaging Initializes the paging
     */
    function initPaging() {
      vm.pageLinks = [
        {text: "Prev", val: vm.pageIndex - 1},
        {text: "Next", val: vm.pageIndex + 1}
      ];
      vm.prevPageLink = {text: "Prev", val: vm.pageIndex - 1};
      vm.nextPageLink = {text: "Next", val: vm.pageIndex + 1};
    }

    function changeView(view) {
      console.log(view)
      vm.view = view;
    }
  }
})();
