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

  var state = {
    go: sinon.spy()
  }

  beforeEach(function() {
    bard.appModule('tc.submissions');
    bard.inject(this, '$controller');
  });

  bard.verifyNoOutstandingHttpRequests();

  beforeEach(function() {
    controller = $controller('SubmissionsController', {
      challengeToSubmitTo: mockChallenge,
      $state: state
    });
    vm = controller;
  });

  it('exists', function() {
    expect(vm).to.exist;
  });

  it('has properties on vm from the routes resolve', function() {
    expect(vm.challengeTitle).to.equal(mockChallenge.challenge.name);
    expect(vm.challengeId).to.equal(30049240);
    expect(vm.track).to.equal(mockChallenge.challenge.track.toLowerCase());
  });

  describe('routes to the correct child state for', function() {
    it('design challenges', function() {

      expect(state.go).calledWith('submissions.file.design');
    });

    it('develop challenges', function() {

      controller = $controller('SubmissionsController', {
        challengeToSubmitTo: {
          challenge: {
            name: 'Challenge Name',
            track: 'DEVELOP',
            id: 30049240
          }
        },
        $state: state
      });
      vm = controller;

      expect(state.go).calledWith('submissions.file.develop');
    });

  });
});
