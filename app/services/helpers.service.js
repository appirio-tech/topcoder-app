(function() {
  'use strict';

  angular.module('topcoder').factory('Helpers', Helpers);

  Helpers.$inject = ['$window', '$location'];

  function Helpers($window, $location) {
    // TODO: Separate helpers by submodule

    var service = {
      storeById: storeById,
      parseQuestions: parseQuestions,
      parseAnswers: parseAnswers,
      compileReviewItems: compileReviewItems
    };
    return service;

    /////////////////////

    function storeById(object, questions) {
      angular.forEach(questions, function(question) {
        object[question.id] = question;
      });
    }

    function parseQuestions(questions) {
      angular.forEach(questions, function(question) {
        if (question.questionTypeId === 5) {
          question.description = question.description;
          question.guidelines = question.guideline.split('\n');
        }
      });
    }

    function parseAnswers(questions, answers) {
      var saved = false;
      angular.forEach(answers, function(answerObject) {
        var questionId = answerObject.scorecardQuestionId;

        questions[questionId].answer = answerObject.answer;
        questions[questionId].reviewItemId = answerObject.id;

        if (answerObject.answer !== '') {
          saved = true;
        }
      });

      return saved;
    }

    function compileReviewItems(questions, review, updating) {
      var reviewItems = [];

      for (var qId in questions) {
        var q = questions[qId];

        var reviewItem = {
          reviewId: review.id,
          scorecardQuestionId: parseInt(qId),
          uploadId: review.uploadId,
          answer: '' + q.answer
        };

        if (updating) {
          reviewItem.id = q.reviewItemId;
        }
        reviewItems.push(reviewItem);
      }
      return reviewItems;
    }

    function countCompleted(reviews) {
      return reviews.reduce(function(numCompleted, review) {
        if (review.committed === 1) {
          return numCompleted + 1;
        }
        return numCompleted;
      }, 0);
    }

    function getParameterByName(name, url) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(url);
      if (results === null) {
        results = '';
      } else {
        results = $window.decodeURIComponent(results[1].replace(/\+/g, ' '));
      }
      return results;
    }
  }
})();
