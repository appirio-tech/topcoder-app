/* jshint -W117, -W030 */
describe('Challenges Widget Controller', function() {
  var controller;
  var authService, challengeService;
  var marathons = mockData.getMockMarathons();

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$controller', '$rootScope', '$q', 'TcAuthService', 'ChallengeService');

    challengeService = ChallengeService;
    authService = TcAuthService;

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

});
