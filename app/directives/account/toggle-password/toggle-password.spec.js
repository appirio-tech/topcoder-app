/* jshint -W117, -W030 */
describe('Toggle Password Directive', function() {
  var scope;
  var element;
  // var challenge = mockData.getMockChallengeWithUserDetails();
  // var spotlightChallenge = mockData.getMockSpotlightChallenges()[0];

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$compile', '$rootScope');
    scope = $rootScope.$new();
  });

  bard.verifyNoOutstandingHttpRequests();
});
