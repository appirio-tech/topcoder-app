(function() {
  'use strict';

  angular.module('tc.peer-review').factory('review', review);

  review.$inject = ['CONSTANTS', 'api'];

  function review(CONSTANTS, api) {
    return {
      getUsersPeerReviews: function(challengeId) {
        var url;
        url = CONSTANTS.API_URL + '/reviews/?filter=' + encodeURIComponent('challengeId=' + challengeId);
        return api.requestHandler('GET', url);
      },
      getReview: function(reviewId) {
        var url;
        url = CONSTANTS.API_URL + '/reviews/' + reviewId;
        return api.requestHandler('GET', url);
      },
      getReviewItems: function(reviewId) {
        var url;
        url = CONSTANTS.API_URL + '/reviewItems/?filter=' + encodeURIComponent('reviewId=' + reviewId);
        return api.requestHandler('GET', url);
      },
      getNextReview: function(challengeId) {
        var url;
        url = CONSTANTS.API_URL + '/challenges/' + challengeId + '/assignNextReview';
        return api.requestHandler('PUT', url);
      },
      saveReviewItems: function(body, isPreviouslySaved) {
        var method, url;
        method = isPreviouslySaved ? 'PUT' : 'POST';
        url = CONSTANTS.API_URL + '/reviewItems/';
        return api.requestHandler(method, url, JSON.stringify(body));
      },
      markAsCompleted: function(reviewId) {
        var body, url;
        url = CONSTANTS.API_URL + '/reviews/' + reviewId;
        body = {
          committed: 1,
          id: reviewId
        };
        return api.requestHandler('PUT', url, JSON.stringify(body));
      }
    };
  };
})();
