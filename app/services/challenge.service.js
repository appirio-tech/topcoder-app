(function() {
  'use strict';

  angular.module('topcoder').factory('challenge', challenge);

  challenge.$inject = ['CONSTANTS', 'api','Restangular', 'Restangular3', '$q'];

  function challenge(CONSTANTS, api, Restangular, Restangular3, $q) {

    var rApi2, rApi;
    rApi2 = Restangular.withConfig(function(RestangularConfigurer) {});
    rApi2.activeChallengeDeferredList = [];
    rApi = Restangular3.withConfig(function(RestangularConfigurer) {});
    rApi.marathonMatchesDeferredList = [];

    var service = {
      getReviewEndDate: getReviewEndDate,
      getChallengeDetails: getChallengeDetails,
      getMyActiveChallenges: getMyActiveChallenges,
      getMyMarathonMatches: getMyMarathonMatches
    };
    return service;

    function getMyActiveChallenges(request) {
      var deferred = $q.defer();

      var prevRequest = rApi2.request;

      // If my active challenges has already been retrieved, simply return it
      if(rApi2.myActiveChallenges && rApi2.myActiveChallenges != "waiting" && !uniqueRequest(prevRequest, request)) {
        deferred.resolve(rApi2.myActiveChallenges);
      } else {
        // Otherwise, set state to waiting, so that only one call is done to the server
        rApi2.myActiveChallenges = "waiting";

        // Add promise to list to it can be resolved when call returns
        rApi2.activeChallengeDeferredList.push(deferred);

        // add default paging
        var pageIndex = request && request.pageIndex ? request.pageIndex : 1;
        var pageSize = request && request.pageSize ? request.pageSize : 10;
        var sortColumn  = request && request.sortColumn ? request.sortColumn : 'submissionEndDate';
        var sortOrder  = request && request.sortOrder ? request.sortOrder : 'asc';

        rApi2.request = request;

        // Fetch list of active challenges for current user
        rApi2.one("user").getList("challenges", {
            type: "active",
            pageIndex: pageIndex,
            pageSize: pageSize,
            sortColumn: sortColumn,
            sortOrder: sortOrder
          }).then(function(data) {
            // Sets the data, and returns it to all pending promises
            rApi2.myActiveChallenges = data;
            angular.forEach(rApi2.activeChallengeDeferredList, function(def) {
              def.resolve(rApi2.myActiveChallenges);
            });
            rApi2.activeChallengeDeferredList = [];
          });
      }

      return deferred.promise;
    }
    function getMyMarathonMatches(request) {
      var deferred, listType, prevRequest, sortColumn, sortOrder;
      deferred = $q.defer();
      prevRequest = rApi.mmRequest;
      if (rApi.myMarathonMatches && rApi.myMarathonMatches !== 'waiting') {
        deferred.resolve(rApi.myMarathonMatches);
      } else {
        rApi.myMarathonMatches = 'waiting';
        rApi.marathonMatchesDeferredList.push(deferred);
        sortColumn = request && request.sortColumn ? request.sortColumn : 'submissionEndDate';
        sortOrder = request && request.sortOrder ? request.sortOrder : 'asc';
        listType = request && request.type ? request.type : 'active';
        rApi.request = request;
        rApi.all('marathonMatches').getList({
          listType: listType,
          sortColumn: sortColumn,
          sortOrder: sortOrder
        }).then(function(data) {
          rApi.myMarathonMatches = data;
          angular.forEach(rApi.marathonMatchesDeferredList, function(def) {
            def.resolve(rApi.myMarathonMatches);
          });
          rApi.marathonMatchesDeferredList = [];
        });
      }
      return deferred.promise;
    }
    function uniqueRequest(prevRequest, currRequest) {
      if (!prevRequest || !currRequest) return true;
      return prevRequest.pageIndex != currRequest.pageIndex ||
        prevRequest.pageSize != currRequest.pageSize ||
        prevRequest.sortColumn != currRequest.sortColumn ||
        prevRequest.sortOrder != currRequest.sortOrder;
    }

    function getReviewEndDate(challengeId) {
      var url = CONSTANTS.API_URL + '/challenges/' + challengeId + '/phases/?filter=' + encodeURIComponent('challengeId=' + challengeId + ' & phaseType=4');
      return api.requestHandler('GET', url);
    }

    function getChallengeDetails(challengeId) {
      var url = CONSTANTS.API_URL_V2 + '/challenges/' + challengeId;
      return api.requestHandler('GET', url, {}, true);
    }
  };

})();
