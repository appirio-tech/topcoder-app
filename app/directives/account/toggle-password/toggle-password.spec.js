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

  // describe('Regular Challenges', function() {
  //   var challengeTile;

  //   beforeEach(function() {
  //     scope.challenge = challenge;
  //     element = angular.element('<challenge-tile class="tile" challenge="challenge"></challenge-tile>)');
  //     challengeTile = $compile(element)(scope);
  //     scope.$digest();
  //   });

  //   it('should have challenge related html', function() {
  //     var directiveHtml = challengeTile.html();
  //     expect(directiveHtml).to.include('challenge-name');
  //     expect(directiveHtml).to.include('Learn and Earn Cordova App Assembly');
  //   });

  //   it('should have a dynamically created member status message', function() {
  //     expect(scope.challenge.memberStatusMsg).to.equal('You are registered!');
  //   });

  //   it('should have domain added to the scope', function() {
  //     expect(element.isolateScope().DOMAIN).to.equal('topcoder-dev.com');
  //   });
  // });

  // describe('Spotlight Challenges', function() {
  //   var spotlightTile;

  //   beforeEach(function() {
  //     scope.challenge = spotlightChallenge;
  //     element = angular.element('<challenge-tile class="tile spotlight" spotlight="spotlight" challenge="challenge"></challenge-tile>');
  //     spotlightTile = $compile(element)(scope);
  //     scope.$digest();
  //   });

  //   it('should have spotlight challenge related html', function() {
  //     var spotlightHtml = spotlightTile.html();

  //     expect(spotlightHtml).to.include('Spotlight Challenge');
  //   });

  //   it('should not show the number of registrants if there are 0', function() {
  //     scope.challenge.numRegistrants = 0;
  //     scope.$digest();

  //     expect(spotlightTile.find('.registrants')[0].className).to.include('ng-hide');
  //   });

  //   it('should not show the number of submissions if there are 0', function() {
  //     scope.challenge.numSubmissions = 0;
  //     scope.$digest();

  //     expect(spotlightTile.find('.submissions')[0].className).to.include('ng-hide');
  //   });
  // });
});
