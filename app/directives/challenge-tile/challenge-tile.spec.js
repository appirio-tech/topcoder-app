/* jshint -W117, -W030 */
describe('Challenge Tile Directive', function() {
  var scope;
  var element;
  var domain;
  var challenge = mockData.getMockChallengeWithUserDetails();
  var spotlightChallenge = mockData.getMockSpotlightChallenges()[0];

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$compile', '$rootScope', 'CONSTANTS');

    scope = $rootScope.$new();
    domain = CONSTANTS.domain;
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Regular Challenges', function() {
    var challengeTile;

    beforeEach(function() {
      scope.challenge = challenge;
      element = angular.element('<challenge-tile class="tile" challenge="challenge"></challenge-tile>)');
      challengeTile = $compile(element)(scope);
      scope.$digest();
    });

    //it('should have challenge related html', function() {
    //  var directiveHtml = challengeTile.html();
    //  expect(directiveHtml).to.include('challenge-name');
    //  expect(directiveHtml).to.include('Learn and Earn Cordova App Assembly');
    //});

    it('should have domain added to the scope', function() {
      expect(element.isolateScope().DOMAIN).to.equal(domain);
    });
  });
});
