/* jshint -W117, -W030 */
describe('Header Dashboard Controller', function() {
  var controller;
  var domain;
  var authService, notificationService, userService, profileService, identity;
  var profile = mockData.getMockProfile();
  var stats = mockData.getMockStats();
  var financials = mockData.getMockUserFinancials();

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this,
      '$controller',
      '$rootScope',
      '$q',
      'TcAuthService',
      'NotificationService',
      'UserService',
      'ProfileService',
      'CONSTANTS',
      'Helpers');

    domain = CONSTANTS.domain;
    notificationService = NotificationService;
    authService = TcAuthService;
    userService = UserService;
    profileService = ProfileService;

    identity = function() {
      return {
        handle: 'albertwang',
        userId: 123456
      };
    };

    // mock user api
    sinon.stub(userService, 'getUserIdentity', function() {
      return {
        userId: 1234567,
        handle: 'ut',
        email: 'ut@topcoder.com'
      };
    });

    // mock profile api
    sinon.stub(profileService, 'getUserProfile', function(handle) {
      var deferred = $q.defer();
      deferred.resolve(profile);
      return deferred.promise;
    });
    sinon.stub(profileService, 'getUserStats', function(handle) {
      var deferred = $q.defer();
      deferred.resolve(stats);
      return deferred.promise;
    });
    // sinon.stub(profileService, 'getRanks', function(handle) {
    //   var deferred = $q.defer();
    //   var resp = {eventId: 3445, userId: 12345};
    //   deferred.resolve(resp);
    //   return deferred.promise;
    // });
    sinon.stub(profileService, 'getUserFinancials', function(handle) {
      var deferred = $q.defer();
      deferred.resolve(financials);
      return deferred.promise;
    });

    // mock challenges api
    sinon.stub(notificationService, 'inform', function() {
      // do nothing
      // TODO may be it can be tested by mocking notifier
    });
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('inialization', function() {
    var controller = null;
    beforeEach( function(){
      $scope = $rootScope.$new();
      controller = $controller('HeaderDashboardController', {
        NotificationService : notificationService,
        UserService : userService,
        ProfileService: profileService,
        userIdentity: identity
      });
      $rootScope.$apply();
    });

    xit('variables should be initialized to correct value', function() {
      expect(controller.domain).to.equal(domain);
      expect(controller.isCopilot).to.equal(false);
      expect(controller.hasRatings).to.equal(true);
      expect(controller.loading).to.equal(false);
      expect(controller.profile).to.exist;
      expect(controller.profile.handle).to.equal('albertwang');
      expect(controller.rankStats).to.exist;
      // there are 7 sub tracks with non null/zero value for one of rank/wins/fulfillment
      expect(controller.rankStats).to.have.length(7);
      expect(controller.moneyEarned).to.equal(60.50);
    });
  });

  describe('inialization with profile api stats endpoint error', function() {
    var controller = null;
    beforeEach( function(){
      $scope = $rootScope.$new();
      profileService.getUserStats.restore();
      sinon.stub(profileService, 'getUserStats', function(handle) {
        var deferred = $q.defer();
        deferred.reject('failed');
        return deferred.promise;
      });
      controller = $controller('HeaderDashboardController', {
        NotificationService : notificationService,
        UserService : userService,
        ProfileService: profileService,
        userIdentity: identity
      });
      $rootScope.$apply();
    });

    it('variables should be initialized to correct value', function() {
      expect(controller.domain).to.equal(domain);
      expect(controller.isCopilot).to.equal(false);
      expect(controller.hasRatings).to.equal(false);
      expect(controller.loading).to.equal(false);
      expect(controller.profile).to.exist;
      expect(controller.profile.handle).to.equal('albertwang');
      expect(controller.rankStats).to.exist;
      expect(controller.rankStats).to.have.length(0);
      expect(controller.moneyEarned).to.equal(60.50);
    });
  });

  describe('inialization with profile api profile endpoint error', function() {
    var controller = null;
    beforeEach( function(){
      $scope = $rootScope.$new();
      profileService.getUserProfile.restore();
      sinon.stub(profileService, 'getUserProfile', function(handle) {
        var deferred = $q.defer();
        deferred.reject('failed');
        return deferred.promise;
      });
      controller = $controller('HeaderDashboardController', {
        NotificationService : notificationService,
        UserService : userService,
        ProfileService: profileService,
        userIdentity: identity
      });
      $rootScope.$apply();
    });

    xit('variables should be initialized to correct value', function() {
      expect(controller.domain).to.equal(domain);
      expect(controller.isCopilot).to.equal(false);
      expect(controller.loading).to.equal(false);
      expect(controller.profile).not.to.exist;
      expect(controller.rankStats).to.exist;
      // there are 7 sub tracks with non null/zero value for one of rank/wins/fulfillment
      expect(controller.rankStats).to.have.length(7);
      expect(controller.hasRatings).to.equal(true);
      expect(controller.moneyEarned).to.equal(60.50);
    });
  });

  describe('inialization with profile api financials endpoint error', function() {
    var controller = null;
    beforeEach( function(){
      $scope = $rootScope.$new();
      profileService.getUserFinancials.restore();
      sinon.stub(profileService, 'getUserFinancials', function(handle) {
        var deferred = $q.defer();
        deferred.reject('failed');
        return deferred.promise;
      });
      controller = $controller('HeaderDashboardController', {
        NotificationService : notificationService,
        UserService : userService,
        ProfileService: profileService,
        userIdentity: identity
      });
      $rootScope.$apply();
    });

    xit('variables should be initialized to correct value', function() {
      expect(controller.domain).to.equal(domain);
      expect(controller.isCopilot).to.equal(false);
      expect(controller.loading).to.equal(false);
      expect(controller.profile).to.exist;
      expect(controller.profile.handle).to.equal('albertwang');
      expect(controller.rankStats).to.exist;
      // there are 7 sub tracks with non null/zero value for one of rank/wins/fulfillment
      expect(controller.rankStats).to.have.length(7);
      expect(controller.hasRatings).to.equal(true);
      expect(controller.moneyEarned).not.to.exist;
    });
  });

});
