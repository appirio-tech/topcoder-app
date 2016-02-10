(function() {
  'use strict';

  angular.module('tc.services').factory('ReviewService', ReviewService);

  ReviewService.$inject = ['CONSTANTS', 'ApiService'];

  function ReviewService(CONSTANTS, ApiService) {
    var api = ApiService.restangularV3
    var service = {
      getUsersPeerReviews: getUsersPeerReviews,
      getReview: getReview,
      getReviewItems: getReviewItems,
      getNextReview: getNextReview,
      saveReviewItems: saveReviewItems,
      markAsCompleted: markAsCompleted
    };
    return service;

    ///////////////

    function getUsersPeerReviews(challengeId) {
      // var url = CONSTANTS.API_URL + '/reviews/?filter=' + encodeURIComponent('challengeId=' + challengeId);
      var params = {
        filter: encodeURIComponent('challengeId='+challengeId)
      }
      return api.all('reviews').getList(params)
    }

    function getReview(reviewId) {
      // var url = CONSTANTS.API_URL + '/reviews/' + reviewId;
      // return ApiService.requestHandler('GET', url);
      return api.one('reviews', reviewId).get()
    }

    function getReviewItems(reviewId) {
      // var url = CONSTANTS.API_URL + '/reviewItems/?filter=' + encodeURIComponent('reviewId=' + reviewId);
      // return ApiService.requestHandler('GET', url);
      var params = {
        filter: encodeURIComponent('reviewId='+reviewId)
      }
      return api.all('reviewItems').getList(params)
    }

    function getNextReview(challengeId) {
      // var url = CONSTANTS.API_URL + '/reviews/' + challengeId + '/assignNextReview';
      // return ApiService.requestHandler('PUT', url);
      return api.one('reviews', challengeId).customPUT(null, 'assignNextReview', null, null)
    }

    function saveReviewItems(body, isPreviouslySaved) {
      // var method = isPreviouslySaved ? 'PUT' : 'POST';
      // var url = CONSTANTS.API_URL + '/reviewItems/';
      // return ApiService.requestHandler(method, url, JSON.stringify(body));
      // body = JSON.stringify(body);
      if (isPreviouslySaved) {
        return api.all('reviewItems').customPUT(body, null, null, null)
      } else {
        return api.all('reivewItems').post(body)
      }
    }

    function markAsCompleted(reviewId) {
      // var url = CONSTANTS.API_URL + '/reviews/' + reviewId;
      var body = {
        committed: 1,
        id: reviewId
      };

      // return ApiService.requestHandler('PUT', url, JSON.stringify(body));
      api.one('reviews', reviewId).put()
    }
  };
})();
