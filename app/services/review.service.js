import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.services').factory('ReviewService', ReviewService)

  ReviewService.$inject = ['CONSTANTS', 'ApiService']

  function ReviewService(CONSTANTS, ApiService) {
    var api = ApiService.getApiServiceProvider('Review')

    var service = {
      getUsersPeerReviews: getUsersPeerReviews,
      getReview: getReview,
      getReviewItems: getReviewItems,
      getNextReview: getNextReview,
      saveReviewItems: saveReviewItems,
      markAsCompleted: markAsCompleted
    }
    return service

    ///////////////
    function getUsersPeerReviews(challengeId) {
      return api.all('reviews').getList({filter: encodeURIComponent('challengeId=' + challengeId)})
    }

    function getReview(reviewId) {
      return api.one('reviews', reviewId).get()
    }

    function getReviewItems(reviewId) {
      return api.all('reviewItems').getList({filter: encodeURIComponent('reviewId=' + reviewId)})
    }

    function getNextReview(challengeId) {
      return api.one('reviews', challengeId).customPUT(null, 'assignNextReview', null, null)
    }

    function saveReviewItems(body, isPreviouslySaved) {
      if (isPreviouslySaved) {
        return api.all('reviewItems').customPUT(body, null, null, null)
      } else {
        return api.all('reviewItems').post(body)
      }
    }

    function markAsCompleted(reviewId) {
      var body = {
        committed: 1,
        id: reviewId
      }

      return api.one('reviews', reviewId).customPUT(body, null, null, null)
    }
  }
})()
