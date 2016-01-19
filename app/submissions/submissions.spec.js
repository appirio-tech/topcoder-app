/* jshint -W117, -W030 */
describe('Submissions Controller', function() {
  var controller, vm;

  var mockChallenge = {
    challenge: {
      name: 'Challenge Name',
      track: 'DESIGN',
      id: 30049240
    }
  };

  beforeEach(function() {
    bard.appModule('tc.submissions');
    bard.inject(this, '$controller');
  });

  bard.verifyNoOutstandingHttpRequests();

  beforeEach(function() {
    controller = $controller('SubmissionsController', {
      challengeToSubmitTo: mockChallenge
    });
    vm = controller;
  });

  it('should exist', function() {
    expect(vm).to.exist;
  });

  it('should have properties on vm from the routes resolve', function() {
    expect(vm.challengeTitle).to.equal(mockChallenge.challenge.name);
    expect(vm.challengeId).to.equal(30049240);
    expect(vm.track).to.equal(mockChallenge.challenge.track.toLowerCase());
  });
});
