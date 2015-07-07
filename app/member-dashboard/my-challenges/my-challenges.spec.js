/* jshint -W117, -W030 */
describe('Challenges Controller', function() {
  var controller;
  var authService, challengeService;
  var challenges = mockData.getMockChallenges();
  var marathons = mockData.getMockMarathons();

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$controller', '$rootScope', '$q', 'auth', 'challenge');

    challengeService = challenge;
    authService = auth;

    // mock active challenges api
    sinon.stub(challengeService, 'getMyActiveChallenges', function() {
      var deferred = $q.defer();
      var resp = JSON.parse(JSON.stringify(challenges));
      resp.pagination = {
        total: challenges.length,
        pageIndex: 1,
        pageSize: 10
      };
      deferred.resolve(resp);
      return deferred.promise;
    });

    // mock marathon matches api
    sinon.stub(challengeService, 'getMyMarathonMatches', function() {
      var deferred = $q.defer();
      var resp = JSON.parse(JSON.stringify(marathons));
      resp.pagination = {
        total: marathons.length,
        pageIndex: 1,
        pageSize: 10
      };
      deferred.resolve(resp);
      return deferred.promise;
    });
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('before login activation', function() {
    beforeEach(function() {
      controller = $controller('MyChallengesCtrl', {
        $scope: $rootScope.$new(),
        auth: authService,
        challenge: challengeService
      });
      $rootScope.$apply();
    });

    it('should be created successfully', function() {
      expect(controller).to.exist;
    });

    it('should not call getMyActiveChallenges of challenge service', function() {
      expect(challengeService.getMyActiveChallenges.callCount).to.be.equal(0);
    });

    it('should not have challenges set', function() {
      expect(controller.myChallenges).to.be.empty;
      expect(controller.visibleChallenges).to.be.empty;
    });
  });

  describe('after login activation', function() {
    beforeEach(function() {
      sinon.stub(authService, 'isAuthenticated', function() {
        return true;
      });
      controller = $controller('MyChallengesCtrl', {
        $scope: $rootScope.$new(),
        auth: authService,
        challenge: challengeService
      });
      $rootScope.$apply();
    });

    it('should be created successfully', function() {
      expect(controller).to.exist;
    });

    it('should call getMyActiveChallenges of challenge service', function() {
      expect(challengeService.getMyActiveChallenges.callCount).to.be.equal(1);
    });

    it('should get challenges from mock service', function() {
      expect(controller.myChallenges).to.exist;
      expect(controller.myChallenges.length).to.equal(challenges.length);
    });
  });

});
