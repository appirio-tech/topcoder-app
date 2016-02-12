import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.peer-review').controller('ReadOnlyScorecardController', ReadOnlyScorecardController)

  ReadOnlyScorecardController.$inject = ['$stateParams', 'ScorecardService', 'Helpers']

  function ReadOnlyScorecardController($stateParams, ScorecardService, Helpers) {
    var scorecardId = $stateParams.scorecardId
    var vm = this
    vm.loaded = false
    vm.scorecard = {}

    activate()

    function activate() {
      ScorecardService.getScorecardById(scorecardId)
      .then(function(response) {
        var scorecardData = response[0]
        vm.scorecard.name = scorecardData.name

        ScorecardService.getScorecardQuestions(scorecardId)
        .then(function(data) {
          vm.scorecard.questions = {}

          var questions = data

          Helpers.storeById(vm.scorecard.questions, questions)
          Helpers.parseQuestions(vm.scorecard.questions)

          vm.loaded = true
        })
      })
    }
  }
})()
