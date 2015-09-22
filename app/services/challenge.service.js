(function() {
  'use strict';

  angular.module('tc.services').factory('ChallengeService', ChallengeService);

  ChallengeService.$inject = ['CONSTANTS', 'ApiService', '$q'];

  function ChallengeService(CONSTANTS, ApiService, $q) {

    var rApi = ApiService.restangularV3;
    var api = ApiService.restangularV3;

    var service = {
      getChallenges: getChallenges,
      getUserChallenges: getUserChallenges,
      getSpotlightChallenges: getSpotlightChallenges,
      getiOSChallenges: getiOSChallenges,
      getMyMarathonMatches: _getMyMarathonMatches,
      getReviewEndDate: getReviewEndDate,
      getChallengeDetails: getChallengeDetails
    };
    return service;

    function getChallenges(params) {
      params.filter = _parseFilterParam(params);
      return api.all('challenges').getList(params);
    }

    function getUserChallenges(handle, params) {
      params.filter = _parseFilterParam(params);
      return api.one('members', handle).all('challenges').getList(params);
    }

    function getSpotlightChallenges() {
      var deferred = $q.defer();

      var mockChallenges = [
        {
          challengeName: 'Styx iOS Video Mobile App Bug Fixes - 177+214',
          challengeType: 'Code',
          totalPrize: '1200',
          registrationStartDate: '2015-05-01T00:00:00.000-0400',
          track: 'DESIGN',
          numRegistrants: 21,
          numSubmissions: 8
        },
        {
          challengeName: 'Styx iOS Video Mobile App Bug Fixes - 177+214',
          challengeType: 'Code',
          totalPrize: '1200',
          registrationStartDate: '2015-05-01T00:00:00.000-0400',
          track: 'DESIGN',
          numRegistrants: 21,
          numSubmissions: 8
        }
      ];

      deferred.resolve(mockChallenges);

      return deferred.promise;
    }

    function getiOSChallenges(params) {
      return api.all('challenges').getList(params);
    }

    /** NOT USED NEEDS TO BE REFACTORED **/

    function _getMyActiveChallenges(request) {
      var deferred = $q.defer();

      var prevRequest = rApi.request;

      // If my active challenges has already been retrieved, simply return it
      if(rApi.myActiveChallenges && rApi.myActiveChallenges != "waiting" && !uniqueRequest(prevRequest, request)) {
        deferred.resolve(rApi.myActiveChallenges);
      } else {
        // Otherwise, set state to waiting, so that only one call is done to the server
        rApi.myActiveChallenges = "waiting";

        // Add promise to list to it can be resolved when call returns
        rApi.activeChallengeDeferredList.push(deferred);

        // add default paging
        var pageIndex = request && request.pageIndex ? request.pageIndex : 1;
        var pageSize = request && request.pageSize ? request.pageSize : 10;
        var sortColumn  = request && request.sortColumn ? request.sortColumn : 'submissionEndDate';
        var sortOrder  = request && request.sortOrder ? request.sortOrder : 'asc';
        var listType  = request && request.listType ? request.listType : 'active';
        var userId  = request && request.userId ? request.userId : null;

        rApi.request = request;

        var filter = [];
        if (listType) {
          filter.push("listType=" + listType);
        }
        if (userId) {
          filter.push("userId=" + userId);
        }
        filter = filter.join("&");

        // Fetch list of active challenges for current user
        rApi.all("challenges").getList({
            type: listType,
            pageIndex: pageIndex,
            pageSize: pageSize,
            sortColumn: sortColumn,
            sortOrder: sortOrder
          }).then(function(data) {
            // Sets the data, and returns it to all pending promises
            rApi.myActiveChallenges = data;
            angular.forEach(rApi.activeChallengeDeferredList, function(def) {
              def.resolve(rApi.myActiveChallenges);
            });
            rApi.activeChallengeDeferredList = [];
            return rApi.myActiveChallenges;
          });
      }

      return deferred.promise;
    }

    function _getMyMarathonMatches(request) {
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
          return rApi.myMarathonMatches;
        });
      }
      return deferred.promise;
    }
    function _uniqueRequest(prevRequest, currRequest) {
      if (!prevRequest || !currRequest) return true;
      return prevRequest.pageIndex != currRequest.pageIndex ||
        prevRequest.pageSize != currRequest.pageSize ||
        prevRequest.sortColumn != currRequest.sortColumn ||
        prevRequest.sortOrder != currRequest.sortOrder ||
        prevRequest.listType != currRequest.listType;
    }

    function getReviewEndDate(challengeId) {
      var url = CONSTANTS.API_URL + '/phases/?challengeId=' + challengeId;
      return ApiService.requestHandler('GET', url);
    }

    function getChallengeDetails(challengeId) {
      var url = CONSTANTS.API_URL + '/challenges/' + challengeId;
      return ApiService.requestHandler('GET', url, {}, true);
    }

    /**
     * Helper method to parse the filter param as required by v3 API from JSON format
     */
    function _parseFilterParam(params) {
      var filter = [];
      if (params.filter) {
        for(var filterKey in params.filter) {
          var filterValue = params.filter[filterKey];
          filter.push(filterKey + '=' + filterValue);
        }
        return filter.join('&');
      }
      return null;
    }

  };

})();
