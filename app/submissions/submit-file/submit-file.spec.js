/* jshint -W117, -W030 */
describe('Submit File Controller', function() {
  var controller;
  var vm;
  var scope;

  var mockChallenge = {
    challenge: {
      name: 'Challenge Name',
      track: 'DESIGN',
      id: 30049240
    }
  };

  userService = {
    getUserIdentity: function() {
      return {
        userId: 123456
      };
    }
  };

  beforeEach(function() {
    bard.appModule('tc.submissions');
    bard.inject(this, '$controller', '$rootScope');

    scope = $rootScope.$new();
  });

  bard.verifyNoOutstandingHttpRequests();

  beforeEach(function() {
    controller = $controller('SubmitFileController', {
      $scope: scope,
      UserService: userService,
      challengeToSubmitTo: mockChallenge
    });
    vm = controller;
  });

  it('should exist', function() {
    expect(vm).to.exist;
  });

  describe('updateProgress ', function() {
    it('should update PREPARE phase end ', function() {
      
    });
  });
});
