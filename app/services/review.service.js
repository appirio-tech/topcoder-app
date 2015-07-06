(function() {
  'use strict';

  angular.module('tc.peer-review').factory('review', review);

  review.$inject = ['CONSTANTS', 'api'];

  function review(CONSTANTS, api) {
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
      var url = CONSTANTS.API_URL + '/reviews/?filter=' + encodeURIComponent('challengeId=' + challengeId);
      return api.requestHandler('GET', url);
    }

    function getReview(reviewId) {
      var url = CONSTANTS.API_URL + '/reviews/' + reviewId;
      return api.requestHandler('GET', url);
    }

    function getReviewItems(reviewId) {
      var url = CONSTANTS.API_URL + '/reviewItems/?filter=' + encodeURIComponent('reviewId=' + reviewId);
      return api.requestHandler('GET', url);
    }

    function getNextReview(challengeId) {
      var url = CONSTANTS.API_URL + '/challenges/' + challengeId + '/assignNextReview';
      return api.requestHandler('PUT', url);
    }

    function saveReviewItems(body, isPreviouslySaved) {
      var method = isPreviouslySaved ? 'PUT' : 'POST';
      var url = CONSTANTS.API_URL + '/reviewItems/';
      return api.requestHandler(method, url, JSON.stringify(body));
    }

    function markAsCompleted(reviewId) {
      var url = CONSTANTS.API_URL + '/reviews/' + reviewId;
      var body = {
        committed: 1,
        id: reviewId
      };

      return api.requestHandler('PUT', url, JSON.stringify(body));
    }
  };
})();
