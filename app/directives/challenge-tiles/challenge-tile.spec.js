/* jshint -W117, -W030 */
describe('Challenge Tile Directive', function() {
  var scope;
  var challenge = mockData.getMockChallengeWithUserDetails();

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$compile', '$rootScope');
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Regular Challenges')
    beforeEach(function() {
      scope = $rootScope.new();
      scope.challenge = challenge;
      var element = angular.element('<challenge-tile class="tile" challenge="challenge"></challenge-tile>)');
      var challengeTile = $compile(element)(scope);
      scope.$digest();
    });

    it('should have html', function() {
      console.log(challengeTile);
    });
});
