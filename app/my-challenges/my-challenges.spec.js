/* jshint -W117, -W030 */
describe('Challenges Controller', function() {
  var controller;
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

    challengeService = ChallengeService;
    authService = TcAuthService;
    userService = UserService;

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

    // mock user api
    sinon.stub(userService, 'getUserIdentity', function() {
      return {
        userId: 1234567,
        handle: 'ut',
        email: 'ut@topcoder.com'
      };
    });

    // mock challenges api
    sinon.stub(challengeService, 'getChallenges', function(data) {
      var deferred = $q.defer();
      var resp = null;
      console.log(data);
      if (data.filter.indexOf('status=Active') != -1) {
        resp = JSON.parse(JSON.stringify(challenges));
      } else {
        resp = JSON.parse(JSON.stringify(challenges.slice(1)));
        console.log(resp);
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
      myChallenges = $controller('MyChallengesController', {
        ChallengeService : challengeService,
        UserService : userService
      });
      $rootScope.$apply();
    });

    it('vm.domain should be initialized to default value', function() {
      // default value for domain
      expect(myChallenges.domain).to.be.equal('topcoder-dev.com');
    });

    it('vm.userHasChallenges should be initialized to default value', function() {
      // default value for pageIndex
      expect(myChallenges.userHasChallenges).to.be.equal(true);
    });

    it('myChallenges.myChallenges should be initialized', function() {
      // default value for pageIndex
      expect(myChallenges.myChallenges).to.be.exist;
      expect(myChallenges.myChallenges.length).to.be.equal(challenges.length);
    });
  });

  describe('active/past filters', function() {
    var myChallenges = null;
    beforeEach( function(){
      $scope = $rootScope.$new();
      myChallenges = $controller('MyChallengesController', {
        ChallengeService : challengeService,
        UserService : userService
      });
      $rootScope.$apply();
    });

    it('past challenges should be fetched', function() {
      expect(myChallenges.myChallenges).to.be.exist;
      expect(myChallenges.myChallenges.length).to.be.equal(challenges.length);
      // apply past filter
      myChallenges.viewPastChallenges();
      $rootScope.$apply();
      expect(myChallenges.myChallenges).to.be.exist;
      // should have one less challenge for past filter as per mocked method
      console.log('verfiig');
      expect(myChallenges.myChallenges.length).to.be.equal(challenges.length - 1);
    });
  });

});
