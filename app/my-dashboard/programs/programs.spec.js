/* jshint -W117, -W030 */
describe('Programs Controller', function() {
  var controller;
  var authService, challengeService, userService, memberCertService;
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
      'MemberCertService',
      'CONSTANTS',
      'Helpers');

    challengeService = ChallengeService;
    authService = TcAuthService;
    userService = UserService;
    memberCertService = MemberCertService;

    // mock user api
    sinon.stub(userService, 'getUserIdentity', function() {
      return {
        userId: 1234567,
        handle: 'ut',
        email: 'ut@topcoder.com'
      };
    });

    // mock member cert api
    sinon.stub(memberCertService, 'getMemberRegistration', function(handle, params) {
      var deferred = $q.defer();
      var resp = {eventId: 3445, userId: 12345};
      deferred.resolve(resp);
      return deferred.promise;
    });

    // mock challenges api
    sinon.stub(challengeService, 'getiOSChallenges', function() {
      var deferred = $q.defer();
      var resp = JSON.parse(JSON.stringify(challenges));
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

  describe('inialization with registered member', function() {
    var myChallenges = null;
    beforeEach( function(){
      $scope = $rootScope.$new();
      myChallenges = $controller('ProgramsController', {
        ChallengeService : challengeService,
        UserService : userService,
        MemberCertService: memberCertService
      });
      $rootScope.$apply();
    });

    it('vm.domain should be initialized to default value', function() {
      // default value for domain
      expect(myChallenges.domain).to.equal('topcoder-dev.com');
      // default value for registered
      expect(myChallenges.registered).to.equal(true);
      // default value for loading
      expect(myChallenges.loading).to.equal(false);
      // default value for challenges
      expect(myChallenges.challenges).to.exist;
      expect(myChallenges.challenges.length).to.equal(challenges.length);
    });
  });

  describe('inialization with unregistered memeber', function() {
    var myChallenges = null;
    beforeEach( function(){
      $scope = $rootScope.$new();
      sinon.restore(memberCertService, 'getMemberRegistration');
      // mock member cert api
      sinon.stub(memberCertService, 'getMemberRegistration', function(handle, params) {
        var deferred = $q.defer();
        deferred.resolve(null);
        return deferred.promise;
      });
      myChallenges = $controller('ProgramsController', {
        ChallengeService : challengeService,
        UserService : userService,
        MemberCertService: memberCertService
      });
      $rootScope.$apply();
    });

    it('vm.domain should be initialized to default value', function() {
      // default value for domain
      expect(myChallenges.domain).to.equal('topcoder-dev.com');
      // default value for registered
      expect(myChallenges.registered).to.equal(false);
      // default value for loading
      expect(myChallenges.loading).to.equal(false);
      // default value for challenges
      expect(myChallenges.challenges).to.exist;
      expect(myChallenges.challenges.length).to.equal(0);
    });
  });

  describe('inialization failure with member api error', function() {
    var myChallenges = null;
    beforeEach( function(){
      $scope = $rootScope.$new();
      sinon.restore(memberCertService, 'getMemberRegistration');
      // mock member cert api
      sinon.stub(memberCertService, 'getMemberRegistration', function(handle, params) {
        var deferred = $q.defer();
        deferred.reject("failed");
        return deferred.promise;
      });
      myChallenges = $controller('ProgramsController', {
        ChallengeService : challengeService,
        UserService : userService,
        MemberCertService: memberCertService
      });
      $rootScope.$apply();
    });

    it('vm.domain should be initialized to default value', function() {
      // default value for domain
      expect(myChallenges.domain).to.equal('topcoder-dev.com');
      // default value for registered
      expect(myChallenges.registered).to.equal(false);
      // default value for loading
      expect(myChallenges.loading).to.equal(false);
      // default value for challenges
      expect(myChallenges.challenges).to.exist;
      expect(myChallenges.challenges.length).to.equal(0);
    });
  });

});
