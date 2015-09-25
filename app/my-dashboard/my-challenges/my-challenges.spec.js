/* jshint -W117, -W030 */
describe('Challenges Widget Controller', function() {
  var controller;
  var domain;
  var authService, challengeService, userService;
  var marathons = mockData.getMockMarathons();
  var challenges = mockData.getMockiOSChallenges();

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this,
      '$controller',
      '$rootScope',
      '$q',
      'TcAuthService',
      'ChallengeService',
      'UserService',
      'CONSTANTS',
      'Helpers');

    domain = CONSTANTS.domain;
    challengeService = ChallengeService;
    authService = TcAuthService;
    userService = UserService;

    // mock user api
    sinon.stub(userService, 'getUserIdentity', function() {
      return {
        userId: 1234567,
        handle: 'ut',
        email: 'ut@topcoder.com'
      };
    });

    // mock challenges api
    sinon.stub(challengeService, 'getUserChallenges', function(handle, params) {
      var deferred = $q.defer();
      var resp = null;
      if (params.filter.status == 'active') {
        resp = JSON.parse(JSON.stringify(challenges));
      } else {
        resp = JSON.parse(JSON.stringify(challenges.slice(1)));
      }
      resp.pagination = {
        total: resp.length,
        pageIndex: 1,
        pageSize: 10
      };
      deferred.resolve(resp);
      return deferred.promise;
    });
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('inialization', function() {
    var myChallenges = null;
    beforeEach( function(){
      $scope = $rootScope.$new();
      myChallenges = $controller('MyChallengesWidgetController', {
        ChallengeService: challengeService,
        UserService: userService,
        userIdentity: {handle: 'username'}
      });
      $rootScope.$apply();
    });

    it('vm.domain should be initialized to default value', function() {
      // default value for domain
      expect(myChallenges.domain).to.equal(domain);
    });

    it('vm.userHasChallenges should be initialized to default value', function() {
      // default value for pageIndex
      expect(myChallenges.userHasChallenges).to.equal(true);
    });

    it('myChallenges.myChallenges should be initialized', function() {
      // default value for pageIndex
      expect(myChallenges.myChallenges).to.exist;
      expect(myChallenges.myChallenges.length).to.equal(challenges.length);
    });
  });

});
