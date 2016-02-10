/*eslint no-undef:0*/
import angular from 'angular'

const mockData = require('../../../tests/test-helpers/mock-data')

describe('Challenge Tile Directive', function() {
  var scope
  var element
  var challenge = mockData.getMockChallengeWithUserDetails()

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject(this, '$compile', '$rootScope', 'CONSTANTS')

    scope = $rootScope.$new()
  })

  bard.verifyNoOutstandingHttpRequests()

  describe('Regular Challenges', function() {

    beforeEach(function() {
      scope.challenge = challenge
      element = angular.element('<challenge-tile class="tile" challenge="challenge"></challenge-tile>)')
      $compile(element)(scope)
      scope.$digest()
    })

    //it('should have challenge related html', function() {
    //  var directiveHtml = challengeTile.html()
    //  expect(directiveHtml).to.include('challenge-name')
    //  expect(directiveHtml).to.include('Learn and Earn Cordova App Assembly')
    //})
  })
})
